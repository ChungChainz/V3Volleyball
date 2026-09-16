import { useSyncExternalStore } from 'react'
import type { Match, SetScore } from '@/data/schedule'
import { schedule } from '@/data/schedule'

/**
 * Score state for the current visit. Every match the commissioner edits on the
 * schedule tab flows through here, and the standings table reads the same
 * snapshot so the table recalculates the moment a result is saved.
 *
 * This is the one stubbed module in the app: results live in memory only and
 * reset on reload. Swapping this file for a Netlify Database-backed server
 * function is the whole of the "live results" milestone in PLAN.md — the
 * component API (useMatches / saveScore / clearScore) stays the same.
 */
let matches: Match[] = schedule
let commissioner = false

const listeners = new Set<() => void>()

function emit() {
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getMatches() {
  return matches
}

function getCommissioner() {
  return commissioner
}

export function useMatches(): Match[] {
  return useSyncExternalStore(subscribe, getMatches, getMatches)
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
}

export function clearScore(matchId: string) {
  matches = matches.map((match) =>
    match.id === matchId ? { ...match, sets: [], status: 'scheduled' } : match,
  )
  emit()
}

/** True once any result differs from the shipped fixture data. */
export function hasLocalEdits(): boolean {
  return matches !== schedule
}
