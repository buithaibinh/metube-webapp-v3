#!/usr/bin/env node
/**
 * UI review script — screenshots + basic interaction checks
 * Usage: node scripts/review-ui.mjs
 */
import { chromium, devices } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '../.ui-review')
const base = process.env.UI_BASE_URL || 'http://localhost:3000'

fs.mkdirSync(outDir, { recursive: true })

const scenarios = [
  { id: 'desktop-light', viewport: { width: 1280, height: 900 }, colorScheme: 'light' },
  { id: 'desktop-dark', viewport: { width: 1280, height: 900 }, colorScheme: 'dark' },
  { id: 'mobile-light', device: devices['iPhone 13'], colorScheme: 'light' },
  { id: 'mobile-dark', device: devices['iPhone 13'], colorScheme: 'dark' },
]

const results = []

async function shot(page, name) {
  await page.screenshot({ path: path.join(outDir, `${name}.png`), fullPage: true })
}

async function runScenario(s) {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    ...(s.device || { viewport: s.viewport }),
    colorScheme: s.colorScheme,
  })
  const page = await context.newPage()

  try {
    await page.addInitScript(() => {
      localStorage.setItem('nuxt-devtools', 'false')
    })
    await page.goto(base, { waitUntil: 'networkidle', timeout: 60000 })
    await page.evaluate(() => {
      document.querySelector('#nuxt-devtools-container')?.remove()
    })
    await shot(page, `${s.id}-home-top`)

    const faqSection = page.locator('#faq')
    await faqSection.scrollIntoViewIfNeeded()

    // FAQ accordion
    const faqBtn = faqSection.locator('button[aria-expanded]').first()
    await faqBtn.click({ force: true })
    await page.waitForTimeout(300)
    const expanded = await faqBtn.getAttribute('aria-expanded')
    results.push({ scenario: s.id, check: 'faq_toggle', ok: expanded === 'true' })

    // FAQ platform links (second item index 1)
    const platformFaq = faqSection.locator('button[aria-expanded]').nth(1)
    await platformFaq.click({ force: true })
    await page.waitForTimeout(200)
    const ytLink = faqSection.locator('a[href*="/youtube"]').first()
    results.push({ scenario: s.id, check: 'faq_youtube_link', ok: (await ytLink.count()) > 0 })

    await shot(page, `${s.id}-faq-open`)

    // Scroll to features / hash platforms
    await page.goto(`${base}/#platforms`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(800)
    const platformsInView = await page.locator('#platforms').evaluate((el) => {
      const r = el.getBoundingClientRect()
      return r.top >= -80 && r.top < window.innerHeight * 0.6
    })
    results.push({ scenario: s.id, check: 'hash_platforms', ok: platformsInView })

    // Hash #download
    await page.goto(`${base}/#download`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(800)
    const downloadInView = await page.locator('#download').evaluate((el) => {
      const r = el.getBoundingClientRect()
      return r.top >= -80 && r.top < window.innerHeight * 0.6
    })
    results.push({ scenario: s.id, check: 'hash_download', ok: downloadInView })

    await shot(page, `${s.id}-platforms-hash`)

    // Mobile menu
    if (s.id.startsWith('mobile')) {
      await page.goto(base, { waitUntil: 'networkidle' })
      const menuBtn = page.getByRole('button', { name: 'Open menu' })
      await menuBtn.click()
      await page.waitForTimeout(200)
      const navVisible = await page.locator('header nav.md\\:hidden a').first().isVisible()
      results.push({ scenario: s.id, check: 'mobile_menu', ok: navVisible })
      await shot(page, `${s.id}-mobile-menu`)
    }

    // Toggle dark mode via header button and verify html class
    await page.goto(base, { waitUntil: 'domcontentloaded' })
    await page.evaluate(() => window.scrollTo(0, 0))
    const themeBtn = page.getByRole('button', { name: 'Toggle theme' })
    const htmlClassBefore = await page.locator('html').getAttribute('class')
    const isDark = htmlClassBefore?.includes('dark')
    if (s.colorScheme === 'dark' && !isDark) {
      await themeBtn.click()
      await page.waitForTimeout(200)
    } else if (s.colorScheme === 'light' && isDark) {
      await themeBtn.click()
      await page.waitForTimeout(200)
    }
    const htmlClass = await page.locator('html').getAttribute('class')
    results.push({
      scenario: s.id,
      check: 'color_scheme',
      ok: s.colorScheme === 'dark' ? htmlClass?.includes('dark') : !htmlClass?.includes('dark'),
    })
  } catch (err) {
    results.push({ scenario: s.id, check: 'error', ok: false, message: String(err) })
  } finally {
    await browser.close()
  }
}

for (const s of scenarios) {
  console.log('Running', s.id)
  await runScenario(s)
}

const report = { base, results, screenshots: fs.readdirSync(outDir) }
fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))

const failed = results.filter((r) => !r.ok)
process.exit(failed.length ? 1 : 0)
