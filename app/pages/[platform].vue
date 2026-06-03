<template>
  <PlatformLanding :platform="platform" />
</template>

<script setup lang="ts">
import type { PlatformSlug } from '~/constants/platforms'

definePageMeta({
  middleware: 'platform',
})

const route = useRoute()
const platform = computed(() => route.params.platform as PlatformSlug)
</script>
