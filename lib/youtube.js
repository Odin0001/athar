// Extracts the video id from the common YouTube URL formats
// (watch?v=, youtu.be/, /embed/, /shorts/, /live/)
export function getYouTubeId(url) {
  try {
    const parsed = new URL(url.trim())
    const host = parsed.hostname.replace(/^www\.|^m\./, '')

    let id = null
    if (host === 'youtu.be') {
      id = parsed.pathname.slice(1).split('/')[0]
    } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      id = parsed.searchParams.get('v') ||
        parsed.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)?.[1]
    }

    return id && /^[\w-]{11}$/.test(id) ? id : null
  } catch {
    return null
  }
}
