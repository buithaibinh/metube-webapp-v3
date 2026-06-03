<template>
  <div class="w-full">
    <FeatureHighlights />
    <HowToUse />
    <ResourcesSection v-if="showResources" />
    <FaqSection />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    showResources?: boolean
  }>(),
  { showResources: true },
)
</script>
