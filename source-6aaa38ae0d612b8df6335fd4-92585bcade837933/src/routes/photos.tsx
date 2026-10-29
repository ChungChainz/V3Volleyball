import { createFileRoute, redirect } from '@tanstack/react-router'

/**
 * The Photo Booth tab was replaced by the Rules tab. Old links and bookmarks
 * to /photos land on the rules page instead.
 */
export const Route = createFileRoute('/photos')({
  beforeLoad: () => {
    throw redirect({ to: '/rules' })
  },
})
