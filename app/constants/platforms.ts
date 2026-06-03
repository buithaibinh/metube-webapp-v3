export const PLATFORM_SLUGS = [
  'youtube',
  'tiktok',
  'facebook',
  'instagram',
  'twitter',
] as const

export type PlatformSlug = (typeof PLATFORM_SLUGS)[number]

export interface PlatformConfig {
  slug: PlatformSlug
  icon: string
  validate: (url: string) => boolean
}

export const PLATFORMS: Record<PlatformSlug, PlatformConfig> = {
  youtube: {
    slug: 'youtube',
    icon: 'lucide:youtube',
    validate: (url) =>
      /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(url),
  },
  tiktok: {
    slug: 'tiktok',
    icon: 'simple-icons:tiktok',
    validate: (url) =>
      /^https?:\/\/((www|vm|vt)\.)?tiktok\.com\//i.test(url),
  },
  facebook: {
    slug: 'facebook',
    icon: 'simple-icons:facebook',
    validate: (url) =>
      /^https?:\/\/(www\.|m\.)?(facebook\.com|fb\.watch)\//i.test(url),
  },
  instagram: {
    slug: 'instagram',
    icon: 'simple-icons:instagram',
    validate: (url) =>
      /^https?:\/\/(www\.)?instagram\.com\//i.test(url),
  },
  twitter: {
    slug: 'twitter',
    icon: 'simple-icons:x',
    validate: (url) =>
      /^https?:\/\/(www\.)?(twitter\.com|x\.com)\//i.test(url),
  },
}

export function isPlatformSlug(value: string): value is PlatformSlug {
  return (PLATFORM_SLUGS as readonly string[]).includes(value)
}

export function getPlatform(slug: string): PlatformConfig | undefined {
  if (!isPlatformSlug(slug)) return undefined
  return PLATFORMS[slug]
}
