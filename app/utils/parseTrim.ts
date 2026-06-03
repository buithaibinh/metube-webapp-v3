/** Parse HH:MM:SS or plain seconds into integer seconds. */
export function parseTimeToSeconds(value: string): number | null {
  const trimmed = value.trim()
  if (!trimmed) return null

  if (/^\d+$/.test(trimmed)) {
    return Number.parseInt(trimmed, 10)
  }

  const parts = trimmed.split(':').map((p) => Number.parseInt(p, 10))
  if (parts.some((n) => Number.isNaN(n))) return null

  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2]
  }
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1]
  }
  if (parts.length === 1) {
    return parts[0]
  }

  return null
}
