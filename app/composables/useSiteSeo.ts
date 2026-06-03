import {
  FAQ_INDICES,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_PATH,
  OG_IMAGE_WIDTH,
  SITE_NAME,
} from '~/constants/seo'

export type SiteSeoOgType = 'website' | 'article'

export interface SiteSeoOptions {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  ogType?: SiteSeoOgType
  /** Inject FAQPage JSON-LD (homepage / platform landings). */
  includeFaq?: boolean
  faqIndices?: readonly number[]
}

type JsonLdGraph = Record<string, unknown>

function buildWebSiteJsonLd(siteUrl: string): JsonLdGraph {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: siteUrl,
    description: 'Free online video downloader for YouTube, TikTok, Facebook, Instagram, and more.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/?url={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

function buildOrganizationJsonLd(siteUrl: string): JsonLdGraph {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: siteUrl,
    logo: `${siteUrl}/apple-touch-icon.png`,
  }
}

function buildFaqJsonLd(
  t: (key: string) => string,
  indices: readonly number[],
  pageUrl: string,
): JsonLdGraph {
  const mainEntity = indices.map((index) => {
    const question = t(`faq.questions.${index}.question`)
    let answer: string

    if (index === 1) {
      answer = `${t('faq.questions.1.answer_intro')} YouTube, TikTok, Facebook, Instagram, Twitter, and more.`
    } else {
      answer = t(`faq.questions.${index}.answer`)
    }

    if (index === 4) {
      answer = `${answer} ${t('legal.terms')} and ${t('legal.policy')}.`
    }

    return {
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    }
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
    url: pageUrl,
  }
}

/**
 * Applies canonical URL, Open Graph/Twitter tags, and JSON-LD (WebSite, Organization, optional FAQPage).
 */
export function useSiteSeo(options: SiteSeoOptions) {
  const { t } = useI18n()
  const route = useRoute()
  const config = useRuntimeConfig()

  const siteUrl = computed(() =>
    String(config.public.siteUrl || 'https://www.metube.one').replace(/\/$/, ''),
  )
  const canonicalUrl = computed(() => `${siteUrl.value}${route.path}`)
  const ogImageUrl = computed(() => `${siteUrl.value}${OG_IMAGE_PATH}`)

  const title = computed(() => toValue(options.title))
  const description = computed(() => toValue(options.description))
  const ogType = options.ogType ?? 'website'
  const faqIndices = options.faqIndices ?? FAQ_INDICES
  const includeFaq = options.includeFaq ?? false

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType,
    ogUrl: canonicalUrl,
    ogImage: ogImageUrl,
    ogImageWidth: OG_IMAGE_WIDTH,
    ogImageHeight: OG_IMAGE_HEIGHT,
    ogImageAlt: () => `${SITE_NAME} — online video downloader`,
    ogSiteName: SITE_NAME,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImageUrl,
  })

  const jsonLd = computed(() => {
    const graphs: JsonLdGraph[] = [
      buildWebSiteJsonLd(siteUrl.value),
      buildOrganizationJsonLd(siteUrl.value),
    ]

    if (includeFaq) {
      graphs.push(buildFaqJsonLd(t, faqIndices, canonicalUrl.value))
    }

    return {
      '@context': 'https://schema.org',
      '@graph': graphs,
    }
  })

  useHead(() => ({
    link: [{ rel: 'canonical', href: canonicalUrl.value }],
    script: [
      {
        key: 'site-json-ld',
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonLd.value),
      },
    ],
  }))
}
