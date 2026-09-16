import { league } from '@/data/league'

export interface VenmoLinkOptions {
  amount: number
  note: string
}

/**
 * `venmo://paycharge` deep link — opens straight into the Venmo app's payment
 * screen on a phone, pre-filled with the recipient, amount and note. Falls
 * through to nothing on desktop, which is why every payment tier also offers
 * `venmoWebLink`.
 */
export function venmoAppLink({ amount, note }: VenmoLinkOptions): string {
  const params = new URLSearchParams({
    txn: 'pay',
    recipients: league.venmo.handle,
    amount: amount.toFixed(2),
    note,
  })
  return `venmo://paycharge?${params.toString()}`
}

/** Web fallback for desktop, or any browser without the Venmo app installed. */
export function venmoWebLink(): string {
  return `https://venmo.com/u/${league.venmo.handle}`
}

/** The handle as it should be typed into Venmo's in-app search, with the @. */
export function venmoHandleDisplay(): string {
  return `@${league.venmo.handle}`
}
