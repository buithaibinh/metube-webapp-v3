<template>
  <div class="w-full">
    <DownloaderSection
      :platform="platform"
      :subtitle-key="`${platform}.subtitle`"
      :copyright-key="`${platform}.copyright_warning`"
      :placeholder-key="`${platform}.input_placeholder`"
    >
      <template #after-download>
        <section class="w-full max-w-3xl mx-auto mt-6 px-2 text-left">
          <div
            class="bg-gray-50 dark:bg-[#181828] rounded-xl p-6 mb-6 text-gray-700 dark:text-gray-300"
          >
            <b>{{ $t('guide') }}</b> {{ $t(`${platform}.guide`) }}
          </div>
          <h3
            class="text-xl md:text-2xl font-bold mb-2"
            style="color: var(--color-primary)"
          >
            {{ $t(`${platform}.desc_title`) }}
          </h3>
          <p
            class="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed"
          >
            {{ $t(`${platform}.desc`) }}
          </p>
        </section>
      </template>
    </DownloaderSection>

    <ResourcesSection />
    <FaqSection />
  </div>
</template>

<script setup lang="ts">
import type { PlatformSlug } from '~/constants/platforms'

const props = defineProps<{
  platform: PlatformSlug
}>()

const { t } = useI18n()

useSiteSeo({
  title: () => t(`meta.${props.platform}.title`),
  description: () => t(`meta.${props.platform}.description`),
  includeFaq: true,
})
</script>
