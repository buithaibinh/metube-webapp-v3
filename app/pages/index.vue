<template>
  <div class="w-full">
    <DownloaderSection />

    <MarketingSections />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSiteSeo({
  title: () => t('meta.site.title'),
  description: () => t('meta.site.description'),
  includeFaq: true,
})
</script>
