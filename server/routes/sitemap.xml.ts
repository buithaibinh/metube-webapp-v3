import { serverQueryContent } from '#content/server'
const LOCALES = ['en', 'vi', 'fr', 'ko', 'ja', 'zh', 'id', 'pt', 'ro', 'ru', 'it']
const STATIC_PAGES = ['', '/youtube', '/tiktok', '/facebook', '/instagram', '/twitter']

function localePrefix(locale: string) {
  return locale === 'en' ? '' : `/${locale}`
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const host = String(config.public.siteUrl || 'https://www.metube.one').replace(/\/$/, '')
  const docs = await serverQueryContent(event).find()
  const urls: string[] = []

  for (const locale of LOCALES) {
    const prefix = localePrefix(locale)
    for (const page of STATIC_PAGES) {
      urls.push(`${host}${prefix}${page}`)
    }
  }

  for (const doc of docs) {
    if (doc._path) {
      urls.push(`${host}${doc._path}`)
    }
  }

  const unique = [...new Set(urls)]
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${unique
  .map(
    (loc) => `  <url>
    <loc>${loc}</loc>
    <changefreq>monthly</changefreq>
  </url>`,
  )
  .join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return body
})
