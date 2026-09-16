export type VideoProvider = 'youtube' | 'instagram' | 'tiktok' | 'link'

export interface ParsedVideo {
  provider: VideoProvider
  /** Inline player URL, when the provider allows framing. */
  embedUrl: string | null
  /** Provider-hosted thumbnail, when one can be derived from the URL. */
  thumbnailUrl: string | null
  label: string
}

/**
 * Turns a pasted share link into something renderable. YouTube links get a
 * real inline player and poster frame; Instagram and TikTok get a branded
 * card that opens in a new tab, since neither allows anonymous framing.
 */
export function parseVideoUrl(raw: string): ParsedVideo | null {
  const input = raw.trim()
  if (!input) return null

  let url: URL
  try {
    url = new URL(input.startsWith('http') ? input : `https://${input}`)
  } catch {
    return null
  }

  const host = url.hostname.replace(/^www\./, '')

  if (host === 'youtu.be' || host.endsWith('youtube.com')) {
    const id =
      host === 'youtu.be'
        ? url.pathname.slice(1)
        : url.searchParams.get('v') ??
          url.pathname.match(/\/(?:shorts|embed|live)\/([\w-]{6,})/)?.[1] ??
          null
    if (!id) return { provider: 'youtube', embedUrl: null, thumbnailUrl: null, label: 'YouTube' }
    return {
      provider: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
      thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      label: 'YouTube',
    }
  }

  if (host.endsWith('instagram.com')) {
    return { provider: 'instagram', embedUrl: null, thumbnailUrl: null, label: 'Instagram' }
  }

  if (host.endsWith('tiktok.com')) {
    return { provider: 'tiktok', embedUrl: null, thumbnailUrl: null, label: 'TikTok' }
  }

  return { provider: 'link', embedUrl: null, thumbnailUrl: null, label: host }
}

/** Route an image through Netlify Image CDN so full-size art never ships. */
export function cdnImage(
  src: string,
  opts: { w: number; h?: number; q?: number; fit?: 'cover' | 'contain' },
): string {
  if (!src.startsWith('/')) return src
  const params = new URLSearchParams({ url: src, w: String(opts.w), fm: 'webp' })
  if (opts.h) params.set('h', String(opts.h))
  if (opts.fit) params.set('fit', opts.fit)
  params.set('q', String(opts.q ?? 72))
  return `/.netlify/images?${params.toString()}`
}
