<template>
  <section id="faq" class="py-16 md:py-24 relative overflow-hidden">
    <div class="max-w-[800px] mx-auto px-4 relative">
      <div class="text-center mb-12">
        <span
          class="inline-block px-4 py-1 rounded-full font-semibold tracking-wider uppercase text-sm mb-4"
          style="background: color-mix(in srgb, var(--color-primary) 10%, transparent); color: var(--color-primary);"
        >
          {{ $t('faq.subtitle') }}
        </span>
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {{ $t('faq.title') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-400 text-lg">
          {{ $t('faq.description') }}
        </p>
      </div>

      <div class="space-y-3">
        <div v-for="index in faqIndices" :key="index" class="group">
          <button
            type="button"
            class="w-full flex items-center justify-between gap-4 p-5 bg-white dark:bg-[#181818] rounded-xl border border-gray-100 dark:border-[#232323] text-left transition hover:border-[color:var(--color-primary)] hover:shadow-md"
            :aria-expanded="openFaqs[index]"
            @click="toggleFaq(index)"
          >
            <h3 class="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
              {{ $t(`faq.questions.${index}.question`) }}
            </h3>
            <Icon
              :name="openFaqs[index] ? 'lucide:chevron-up' : 'lucide:chevron-down'"
              class="w-5 h-5 shrink-0"
              :style="{ color: 'var(--color-primary)' }"
            />
          </button>
          <div
            v-show="openFaqs[index]"
            class="mt-1 p-5 bg-white dark:bg-[#181818] rounded-xl border border-gray-100 dark:border-[#232323] text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            <template v-if="index === 1">
              <p class="mb-3">
                {{ $t('faq.questions.1.answer_intro') }}
              </p>
              <div class="flex flex-wrap gap-2">
                <NuxtLinkLocale
                  v-for="p in platformLinks"
                  :key="p.slug"
                  :to="`/${p.slug}`"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white transition hover:opacity-90"
                  :style="{ background: p.color }"
                >
                  <Icon :name="p.icon" class="w-4 h-4" />
                  {{ $t(`menu.${p.slug}`) }}
                </NuxtLinkLocale>
              </div>
            </template>
            <template v-else-if="index === 4">
              <p>
                {{ $t('faq.questions.4.answer') }}
                <NuxtLink to="/terms" class="font-medium underline mx-1 cursor-pointer" style="color: var(--color-primary);">
                  {{ $t('legal.terms_short') }}
                </NuxtLink>
                {{ $t('legal.and') }}
                <NuxtLink to="/policy" class="font-medium underline mx-1 cursor-pointer" style="color: var(--color-primary);">
                  {{ $t('legal.policy_short') }}
                </NuxtLink>.
              </p>
            </template>
            <p v-else>
              {{ $t(`faq.questions.${index}.answer`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PLATFORM_SLUGS } from '~/constants/platforms'

const faqIndices = [0, 1, 2, 3, 4]
const openFaqs = ref<boolean[]>(faqIndices.map(() => false))

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

function toggleFaq(index: number) {
  openFaqs.value[index] = !openFaqs.value[index]
}
</script>
