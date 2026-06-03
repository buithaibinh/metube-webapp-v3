/**
 * Merge v2 i18n/*.js meta + home platform subtitles into v3 locale JSON files.
 * Usage: node i18n/scripts/sync-locales.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const localesDir = path.join(__dirname, '../locales')
const v2Dir = process.env.V2_I18N_DIR
  ? path.resolve(process.env.V2_I18N_DIR)
  : path.resolve(__dirname, '../../../v2/web-app/i18n')

if (!fs.existsSync(v2Dir)) {
  console.error(`v2 i18n not found: ${v2Dir}`)
  console.error('Set V2_I18N_DIR=/path/to/v2/web-app/i18n or clone v2 beside this repo.')
  process.exit(1)
}

const PLATFORM_SLUGS = ['youtube', 'tiktok', 'facebook', 'instagram', 'twitter']
const NEW_LOCALES = ['id', 'pt', 'ro', 'ru', 'it']
const ALL_LOCALES = ['en', 'vi', 'fr', 'ko', 'ja', 'zh', ...NEW_LOCALES]

async function loadV2(code) {
  const file = path.join(v2Dir, `${code}.js`)
  if (!fs.existsSync(file)) return null
  const mod = await import(pathToFileURL(file).href)
  return mod.default
}

function ensureMeta(locale, v2) {
  if (!locale.meta) locale.meta = {}
  if (!locale.meta.site) locale.meta.site = {}

  const siteTitle = locale.index?.title || locale.meta?.site?.title
  const siteDesc =
    locale.index?.desc || locale.index?.subtitle || locale.meta?.site?.description

  locale.meta.site.title =
    v2?.meta?.title || siteTitle || 'metube.one - Video Downloader'
  locale.meta.site.description =
    v2?.meta?.description || siteDesc || 'Download videos from social platforms.'

  for (const slug of PLATFORM_SLUGS) {
    if (!locale.meta[slug]) locale.meta[slug] = {}
    const platform = locale[slug] || {}
    const v2Home = v2?.home?.[slug]

    locale.meta[slug].title =
      platform.desc_title ||
      v2Home?.title ||
      `${slug} Video Downloader | metube.one`
    locale.meta[slug].description =
      platform.desc || v2Home?.subtitle || locale.meta.site.description

    if (v2Home?.subtitle && locale[slug]) {
      locale[slug].subtitle = v2Home.subtitle
    }
    if (v2Home?.title && locale[slug] && !locale[slug].desc_title) {
      locale[slug].desc_title = v2Home.title
    }
  }
}

function ensureSharedKeys(locale, en) {
  if (!locale.guide) locale.guide = en.guide
  if (!locale.downloads) locale.downloads = en.downloads
  if (!locale.error?.fetch_failed) {
    locale.error = { ...en.error, ...locale.error }
  }
  for (const slug of PLATFORM_SLUGS) {
    if (!locale[slug] && en[slug]) locale[slug] = { ...en[slug] }
    if (locale[slug] && en[slug]) {
      locale[slug] = { ...en[slug], ...locale[slug] }
    }
  }
}

async function main() {
  const en = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'))
  en.guide = en.guide || 'Guide:'
  ensureMeta(en, await loadV2('en'))
  fs.writeFileSync(path.join(localesDir, 'en.json'), JSON.stringify(en, null, 2) + '\n')

  for (const code of ALL_LOCALES) {
    if (code === 'en') continue

    const outPath = path.join(localesDir, `${code}.json`)
    let locale

    if (NEW_LOCALES.includes(code) && !fs.existsSync(outPath)) {
      locale = structuredClone(en)
    } else if (fs.existsSync(outPath)) {
      locale = JSON.parse(fs.readFileSync(outPath, 'utf8'))
    } else {
      continue
    }

    const v2 = await loadV2(code)
    ensureSharedKeys(locale, en)
    ensureMeta(locale, v2)
    fs.writeFileSync(outPath, JSON.stringify(locale, null, 2) + '\n')
    console.log('Updated', code)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
