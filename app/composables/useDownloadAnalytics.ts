/** GA4 events — same category/params as v2 (`useTrackEvent('Download', …)`). */
export function trackDownloadEvent(action: string, label?: string) {
  if (import.meta.server) return

  const { gtag } = useGtag()
  gtag('event', 'Download', {
    action,
    ...(label ? { label } : {}),
  })
}
