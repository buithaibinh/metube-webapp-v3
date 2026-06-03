<template>
  <div class="w-full max-w-3xl mx-auto px-4 py-8">
    <ContentDoc :path="contentPath">
      <template #default="{ doc }">
        <article class="legal-content">
          <h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            {{ doc.title }}
          </h1>
          <ContentRenderer :value="doc" />
        </article>
      </template>
      <template #not-found>
        <div class="text-center py-20">
          <p class="text-6xl font-bold text-gray-300 dark:text-gray-700">404</p>
          <p class="text-xl text-gray-500 mt-4">{{ $t('error.page_not_found') }}</p>
          <NuxtLinkLocale to="/" class="inline-block mt-6 font-semibold" style="color: var(--color-primary)">
            {{ $t('error.back_home') }}
          </NuxtLinkLocale>
        </div>
      </template>
    </ContentDoc>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  contentPath: string
}>()
</script>
