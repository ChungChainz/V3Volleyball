/*
 * Scheduled rebuild.
 *
 * Netlify has no cron primitive for builds on this plan, so this deploys a
 * Netlify Scheduled Function that POSTs to a Build Hook every night. The
 * hook URL is supplied by BUILD_HOOK_URL at deploy time and never committed.
 *
 * Schedule: 09:00 UTC daily == 2:00 AM Pacific, comfortably after any league
 * activity has finished for the night.
 */
export default async () => {
  const hookUrl = process.env.BUILD_HOOK_URL

  if (!hookUrl) {
    console.error('BUILD_HOOK_URL is not set — skipping scheduled rebuild.')
    return new Response('BUILD_HOOK_URL not configured', { status: 500 })
  }

  const response = await fetch(hookUrl, { method: 'POST' })

  if (!response.ok) {
    console.error(`Build hook responded ${response.status}`)
    return new Response(`Build hook failed: ${response.status}`, { status: 502 })
  }

  console.log('Nightly rebuild triggered.')
  return new Response('Rebuild triggered', { status: 200 })
}

export const config = {
  schedule: '@daily',
}
