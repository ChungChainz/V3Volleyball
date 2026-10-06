export interface Photo {
  id: string
  /** Week the photo came from. */
  week: number
  /** Image path under /public. */
  src: string
  caption: string
  /** Who took or submitted the shot. */
  credit: string
}

/**
 * Photo Booth reel. Empty until photos start landing — the Photo Booth tab and
 * the home strip both render an empty state meanwhile.
 */
export const photos: Photo[] = []
