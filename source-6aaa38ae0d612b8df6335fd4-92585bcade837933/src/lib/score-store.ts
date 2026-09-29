import { useSyncExternalStore } from 'react'
import type { Match, SetScore } from '@/data/schedule'
import { schedule } from '@/data/schedule'
import type { MatchResult } from '@/lib/match-results'
import { clearMatchResult, getMatchResults, saveMatchResult } from '@/lib/match-results'

/**
 * Score state shared by every page. Results are persisted in Netlify Database
 * (the match_results table) through server functions, so a score saved on the
 * schedule tab survives a reload and shows up for every visitor. Matches with
 * no saved result fall back to the static fixtures in src/data/schedule.ts,
 * and the standings table derives from this same snapshot.
 *
 * Saves apply optimistically; if the write fails the store resyncs from the
 * database. The component API (useMatches / saveScore / clearScore) is
 * unchanged from the in-memory version.
 */
let matches: Match[] = schedule
let commissioner = false

const REFRESH_INTERVAL_MS = 30_000

const listeners = new Set<() => void>()
let stopSync: (() => void) | null = null
let inflight: Promise<void> | null = null
let pendingWrites = 0

function emit() {
  for (const listener of listeners) listener()
}

function mergeResults(results: MatchResult[]): Match[] {
  if (results.length === 0) return schedule
  const byId = new Map(results.map((result) => [result.matchId, result]))
  return schedule.map((match) => {
    const result = byId.get(match.id)
    return result ? { ...match, sets: result.sets, status: result.status } : match
  })
}

function refresh(): Promise<void> {
  if (inflight) return inflight
  inflight = getMatchResults()
    .then((results) => {
      // Don't clobber an optimistic update that hasn't reached the database yet.
      if (pendingWrites > 0) return
      matches = mergeResults(results)
      emit()
    })
    .catch((error) => {
      console.error('Could not load match results', error)
    })
    .finally(() => {
      inflight = null
    })
  return inflight
}

function startSync() {
  if (typeof window === 'undefined') return () => {}
  refresh()
  const onFocus = () => refresh()
  const onVisible = () => {
    if (document.visibilityState === 'visible') refresh()
  }
  const timer = window.setInterval(refresh, REFRESH_INTERVAL_MS)
  window.addEventListener('focus', onFocus)
  document.addEventListener('visibilitychange', onVisible)
  return () => {
    window.clearInterval(timer)
    window.removeEventListener('focus', onFocus)
    document.removeEventListener('visibilitychange', onVisible)
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (!stopSync) stopSync = startSync()
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0 && stopSync) {
      stopSync()
      stopSync = null
    }
  }
}

function getMatches() {
  return matches
}

function getServerMatches() {
  return schedule
}

function getCommissioner() {
  return commissioner
}

function persist(write: Promise<unknown>) {
  pendingWrites += 1
  write
    .catch((error) => {
      console.error('Could not save match result', error)
    })
    .finally(() => {
      pendingWrites -= 1
      if (pendingWrites === 0) refresh()
    })
}

export function useMatches(): Match[] {
  return useSyncExternalStore(subscribe, getMatches, getServerMatches)
}

export function useCommissioner(): boolean {
  return useSyncExternalStore(subscribe, getCommissioner, () => false)
}

export function setCommissioner(next: boolean) {
  commissioner = next
  emit()
}

/** Only sets with a real, non-tied score count toward the result. */
export function saveScore(matchId: string, sets: SetScore[]) {
  const played = sets.filter((set) => set.home !== set.away && (set.home > 0 || set.away > 0))
  matches = matches.map((match) =>
    match.id === matchId
      ? { ...match, sets: played, status: played.length > 0 ? 'final' : 'scheduled' }
      : match,
  )
  emit()
  persist(saveMatchResult({ data: { matchId, sets: played } }))
}

export function clearScore(matchId: string) {
  matches = matches.map((match) =>
    match.id === matchId ? { ...match, sets: [], status: 'scheduled' } : match,
  )
  emit()
  persist(clearMatchResult({ data: { matchId } }))
}

/** True once any result differs from the shipped fixture data. */
export function hasLocalEdits(): boolean {
  return matches !== schedule
}
