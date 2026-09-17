export interface Highlight {
  id: string
  title: string
  /** Week the clip came from; 0 for preseason or league-wide reels. */
  week: number
  url: string
  poster: string
  teamIds: string[]
  submittedBy: string
  length: string
  blurb: string
}

/**
 * Highlight reel. Empty until week 1 — clips accumulate here as they are
 * submitted and filed. The Highlights tab renders an empty state meanwhile.
 */
export const highlights: Highlight[] = []
