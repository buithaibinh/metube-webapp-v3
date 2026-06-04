/** GA4 download events — same shape as v2 `useTrackEvent('Download', …)`. */
export function trackDownloadEvent(action: string, label?: string) {
  if (import.meta.server) return

  const { gtag } = useGtag()
  gtag('event', 'Download', {
    action,
    ...(label ? { label } : {}),
  })
}

export function useDownloadAnalytics() {
  return { trackDownloadEvent }
}
