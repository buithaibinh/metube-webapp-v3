<template>
  <div id="download" class="w-full max-w-4xl mx-auto flex flex-col items-center scroll-mt-24">
    <PageTitle :subtitle="subtitle" />

    <CopyrightWarning :message-key="copyrightKey" />

    <UrlInputBox
      :placeholder="placeholder"
      :icon="icon"
      icon-class="w-5 h-5"
      :button-label="$t('index.input_button')"
      :validate="validate"
      :invalid-error-key="invalidErrorKey"
      :initial-url="initialUrl"
      @submit="onUrlSubmit"
    />

    <DownloadJobList />

    <slot name="after-download" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PlatformSlug } from '~/constants/platforms'
import { getPlatform } from '~/constants/platforms'

const props = withDefaults(
  defineProps<{
    subtitleKey?: string
    copyrightKey?: string
    platform?: PlatformSlug
    icon?: string
    placeholderKey?: string
  }>(),
  {
    subtitleKey: 'index.subtitle',
    copyrightKey: 'index.copyright_warning',
    icon: 'lucide:link',
    placeholderKey: 'index.input_placeholder',
  },
)

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const subtitle = computed(() => t(props.subtitleKey))
const copyrightKey = computed(() => props.copyrightKey)

const placeholder = computed(() => {
  if (props.placeholderKey) {
    const translated = t(props.placeholderKey)
    if (translated !== props.placeholderKey) return translated
  }
  return t('index.input_placeholder')
})

const icon = computed(() => {
  if (props.platform) return getPlatform(props.platform)?.icon ?? props.icon
  return props.icon
})

const validate = computed(() => {
  if (props.platform) {
    const fn = getPlatform(props.platform)?.validate
    return (url: string) => {
      if (!fn?.(url)) return false
      try {
        const u = new URL(url)
        return u.protocol === 'http:' || u.protocol === 'https:'
      } catch {
        return false
      }
    }
  }
  return (url: string) => {
    try {
      const u = new URL(url)
      return u.protocol === 'http:' || u.protocol === 'https:'
    } catch {
      return false
    }
  }
})

const invalidErrorKey = computed(() =>
  props.platform ? 'error.invalid_platform_url' : 'error.invalid_url',
)

const initialUrl = computed(() => {
  const url = route.query.url
  return typeof url === 'string' ? url : ''
})

function onUrlSubmit(url: string) {
  router.replace({ query: { ...route.query, url } })
}
</script>
