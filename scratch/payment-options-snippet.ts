/**
 * Season fee summary rendered on the payment tab.
 */
export const paymentOptions = [
  {
    id: 'full',
    label: 'Team Total Payment',
    amount: season.fees.team,
    blurb: 'Eight weeks of court time, refs and playoffs for the whole roster. Covers the full season.',
  },
] as const
