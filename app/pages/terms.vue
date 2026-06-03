<template>
  <LegalPage content-path="/terms" />
</template>

<script setup lang="ts">
defineI18nRoute(false)

useSiteSeo({
  title: 'Terms of Service | metube.one',
  description: 'Terms of Service for metube.one video downloader',
  ogType: 'article',
})
</script>
