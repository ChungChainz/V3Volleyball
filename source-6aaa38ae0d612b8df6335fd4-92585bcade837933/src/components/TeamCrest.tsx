import type { Team } from '@/data/teams'

/**
 * Jersey-style crest built from each team's abbreviation and two-tone colors,
 * so every team has a mark without eight image files to maintain.
 */
export function TeamCrest({ team, size = 44 }: { team: Team; size?: number }) {
  const [accent, base] = team.colors
  const gradientId = `crest-${team.id}`
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
          <stop offset="100%" stopColor={base} />
        </linearGradient>
      </defs>
      <path
        d="M24 1.5 45 7v20.5c0 9.2-8.2 16.1-21 19.9C11.2 43.6 3 36.7 3 27.5V7Z"
        fill={`url(#${gradientId})`}
        stroke={accent}
        strokeWidth="1.4"
      />
      <path d="M24 1.5 45 7v6L24 7.6 3 13V7Z" fill="rgba(255,255,255,0.14)" />
      <text
        x="24"
        y="31"
        textAnchor="middle"
        fontFamily="Anton, Arial Narrow, sans-serif"
        fontSize="15"
        fill="#fff"
        letterSpacing="0.5"
      >
        {team.abbr}
      </text>
    </svg>
  )
}
