// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },

  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
  ],

  css: ['~/assets/css/main.css', '~/assets/css/theme.css', '~/assets/css/content.css'],

  content: {
    documentDriven: false,
  },

  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/sitemap.xml', '/terms', '/policy'],
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.metube.one',
      // Legacy production APIs (v2) — see metube.one/v2/web-app/aws-exports.js
      ytdlpApiUrl: process.env.NUXT_PUBLIC_YTDLP_API_URL || 'https://yt-dlp-api.metube.one/',
      ytdlpApiKey:
        process.env.NUXT_PUBLIC_YTDLP_API_KEY
        || 'DwiHWgkBth6kBmyyrWoiD2DxdkrNwIQz20iUhOJH',
      videoApiUrl:
        process.env.NUXT_PUBLIC_VIDEO_API_URL
        || 'https://bbmeugrcyg.execute-api.us-east-1.amazonaws.com/prod/',
      appsyncGraphqlEndpoint:
        process.env.NUXT_PUBLIC_APPSYNC_GRAPHQL_ENDPOINT
        || 'https://a7sm5mg3ejhmvfbhgwdgegl3z4.appsync-api.us-east-1.amazonaws.com/graphql',
      appsyncApiKey:
        process.env.NUXT_PUBLIC_APPSYNC_API_KEY || 'da2-l3bog7cyefau3pijyzwxjingai',
      cognitoRegion: process.env.NUXT_PUBLIC_COGNITO_REGION || 'us-east-1',
      cognitoUserPoolId:
        process.env.NUXT_PUBLIC_COGNITO_USER_POOL_ID || 'us-east-1_z3AbsRmfN',
      cognitoUserPoolWebClientId:
        process.env.NUXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || '2ab0lrm657ou9pfo05mra1j4cr',
      cognitoIdentityPoolId:
        process.env.NUXT_PUBLIC_COGNITO_IDENTITY_POOL_ID
        || 'us-east-1:83858915-51d9-4527-a55f-c26f2f8f91b7',
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.metube.one',
    seo: true,
    defaultLocale: 'en',
    langDir: 'locales',
    locales: [
      { code: 'en', name: 'English', file: 'en.json', language: 'en-US' },
      { code: 'vi', name: 'Tiếng Việt', file: 'vi.json', language: 'vi-VN' },
      { code: 'fr', name: 'Français', file: 'fr.json', language: 'fr-FR' },
      { code: 'ko', name: '한국어', file: 'ko.json', language: 'ko-KR' },
      { code: 'ja', name: '日本語', file: 'ja.json', language: 'ja-JP' },
      { code: 'zh', name: '中文', file: 'zh.json', language: 'zh-CN' },
      { code: 'id', name: 'Bahasa Indonesia', file: 'id.json', language: 'id-ID' },
      { code: 'pt', name: 'Português', file: 'pt.json', language: 'pt-BR' },
      { code: 'ro', name: 'Română', file: 'ro.json', language: 'ro-RO' },
      { code: 'ru', name: 'Русский', file: 'ru.json', language: 'ru-RU' },
      { code: 'it', name: 'Italiano', file: 'it.json', language: 'it-IT' },
    ],
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  vite: {
    optimizeDeps: {
      include: ['aws-amplify'],
    },
    ssr: {
      noExternal: [],
    },
  },

  compatibilityDate: '2024-11-27',
});