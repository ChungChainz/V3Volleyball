import { useState } from 'react'
import { Check, Trash2, X } from 'lucide-react'
import type { Match, SetScore } from '@/data/schedule'
import { setTally } from '@/data/schedule'
import { teamById } from '@/data/teams'
import { clearScore, saveScore } from '@/lib/score-store'

type Draft = Array<{ home: string; away: string }>

const emptyDraft: Draft = [
  { home: '', away: '' },
  { home: '', away: '' },
  { home: '', away: '' },
]

function toDraft(match: Match): Draft {
  return emptyDraft.map((blank, index) => {
    const set = match.sets[index]
    return set ? { home: String(set.home), away: String(set.away) } : blank
  })
}

/**
 * Best-of-three score entry. Sets one and two go to 25, set three to 15, and
 * the third row is only needed when the first two split — matching how the
 * scoresheet is filled in at the table.
 */
export function ScoreSheet({ match, onClose }: { match: Match; onClose: () => void }) {
  const [draft, setDraft] = useState<Draft>(() => toDraft(match))
  const [error, setError] = useState<string | null>(null)

  const home = teamById(match.homeId)
  const away = teamById(match.awayId)
  if (!home || !away) return null

  const parsed: SetScore[] = draft
    .map((set) => ({ home: Number(set.home), away: Number(set.away) }))
    .filter(
      (set, index) =>
        draft[index].home.trim() !== '' &&
        draft[index].away.trim() !== '' &&
        Number.isFinite(set.home) &&
        Number.isFinite(set.away),
    )

  const tally = setTally(parsed)

  function update(index: number, side: 'home' | 'away', value: string) {
    const clean = value.replace(/[^0-9]/g, '').slice(0, 2)
    setDraft((current) =>
      current.map((set, position) => (position === index ? { ...set, [side]: clean } : set)),
    )
    setError(null)
  }

  function submit() {
    if (parsed.length === 0) {
      setError('Enter at least two set scores.')
      return
    }
    if (parsed.some((set) => set.home === set.away)) {
      setError('A set cannot end level. Check the tied set.')
      return
    }
    if (tally.home === tally.away) {
      setError('Best of three needs a winner — one side has to take two sets.')
      return
    }
    if (Math.max(tally.home, tally.away) < 2) {
      setError('A match is won at two sets. Add the deciding set.')
      return
    }
    saveScore(match.id, parsed)
    onClose()
  }

  return (
    <div className="border-t border-[var(--edge)] bg-[#0d0d11] px-4 py-5 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <p className="kicker">Scoresheet · Week {match.week}</p>
        <button
          type="button"
          onClick={onClose}
          className="text-ash transition-colors hover:text-bone"
          aria-label="Close scoresheet"
        >
          <X size={18} />
        </button>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto]">
        <div className="space-y-3">
          {draft.map((set, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="kicker w-14 shrink-0 text-[0.58rem]">
                Set {index + 1}
              </span>
              <label className="sr-only" htmlFor={`${match.id}-s${index}-home`}>
                {home.name} set {index + 1}
              </label>
              <input
                id={`${match.id}-s${index}-home`}
                className="field num w-16 text-center"
                inputMode="numeric"
                placeholder={index === 2 ? '15' : '25'}
                value={set.home}
                onChange={(event) => update(index, 'home', event.target.value)}
              />
              <span className="text-ash-dim">—</span>
              <label className="sr-only" htmlFor={`${match.id}-s${index}-away`}>
                {away.name} set {index + 1}
              </label>
              <input
                id={`${match.id}-s${index}-away`}
                className="field num w-16 text-center"
                inputMode="numeric"
                placeholder={index === 2 ? '15' : '25'}
                value={set.away}
                onChange={(event) => update(index, 'away', event.target.value)}
              />
              <span className="truncate text-xs uppercase tracking-[0.14em] text-ash-dim">
                {index === 2 ? 'Deciding set, to 15' : 'To 25'}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-4 border-[var(--edge)] sm:border-l sm:pl-6">
          <div>
            <p className="kicker text-[0.58rem]">Running result</p>
            <p className="num mt-1 text-3xl font-bold">
              <span className={tally.home > tally.away ? 'text-blood' : 'text-bone'}>
                {tally.home}
              </span>
              <span className="text-ash-dim"> · </span>
              <span className={tally.away > tally.home ? 'text-blood' : 'text-bone'}>
                {tally.away}
              </span>
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ash-dim">
              {home.abbr} · {away.abbr}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-blood !px-4 !py-2.5" onClick={submit}>
              <Check size={15} /> Save
            </button>
            {match.status === 'final' && (
              <button
                type="button"
                className="btn btn-steel !px-4 !py-2.5"
                onClick={() => {
                  clearScore(match.id)
                  setDraft(emptyDraft)
                  onClose()
                }}
              >
                <Trash2 size={15} /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 border-l-2 border-blood bg-[rgba(208,16,24,0.1)] px-3 py-2 text-sm text-bone">
          {error}
        </p>
      )}
    </div>
  )
}
