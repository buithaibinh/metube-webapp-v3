<template>
  <section id="platforms" class="py-12 md:py-16 w-full scroll-mt-20">
    <div class="max-w-[1000px] mx-auto px-4 text-center">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {{ $t('resources.title') }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-8 flex items-center justify-center gap-2 text-sm md:text-base">
        <Icon name="lucide:lightbulb" class="w-5 h-5 text-amber-500 shrink-0" />
        {{ $t('resources.subtitle') }}
      </p>

      <div class="flex flex-wrap justify-center gap-3">
        <NuxtLinkLocale
          v-for="item in platformLinks"
          :key="item.slug"
          :to="`/${item.slug}`"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm shadow-md hover:scale-105 transition-transform"
          :style="{ background: item.color }"
        >
          <Icon :name="item.icon" class="w-5 h-5" />
          {{ $t(`menu.${item.slug}`) }}
        </NuxtLinkLocale>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PLATFORM_SLUGS } from '~/constants/platforms'

const platformLinks = PLATFORM_SLUGS.map((slug) => ({
  slug,
  icon:
    slug === 'youtube'
      ? 'lucide:youtube'
      : slug === 'tiktok'
        ? 'simple-icons:tiktok'
        : slug === 'facebook'
          ? 'simple-icons:facebook'
          : slug === 'instagram'
            ? 'simple-icons:instagram'
            : 'simple-icons:x',
  color:
    slug === 'youtube'
      ? '#dc2626'
      : slug === 'tiktok'
        ? '#0891b2'
        : slug === 'facebook'
          ? '#4f46e5'
          : slug === 'instagram'
            ? '#9333ea'
            : '#0ea5e9',
}))
</script>
