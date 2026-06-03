<template>
  <section class="py-16 md:py-24 relative overflow-hidden">
    <div
      class="absolute inset-0"
      style="background: linear-gradient(to bottom, color-mix(in srgb, var(--color-primary) 5%, transparent), transparent, color-mix(in srgb, var(--color-primary) 5%, transparent));"
    />
    <div
      class="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-40"
      style="background: var(--color-primary-light);"
    />

    <div class="max-w-[1000px] mx-auto px-4 relative">
      <div class="text-center mb-16">
        <span
          class="inline-block px-4 py-1 rounded-full font-semibold tracking-wider uppercase text-sm mb-4"
          style="background: color-mix(in srgb, var(--color-primary) 10%, transparent); color: var(--color-primary);"
        >
          {{ $t('features.subtitle') }}
        </span>
        <h2
          class="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          style="background-image: linear-gradient(to right, var(--color-primary), var(--color-primary-dark)); -webkit-background-clip: text; background-clip: text; color: transparent;"
        >
          {{ $t('features.title') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          {{ $t('features.description') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <NuxtLinkLocale
          v-for="card in cards"
          :key="card.key"
          :to="card.to"
          class="group block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]"
        >
          <div
            class="relative bg-white dark:bg-[#181818] p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-[#232323] h-full flex flex-col transition-all duration-300 group-hover:border-[color:var(--color-primary)] group-hover:shadow-lg group-hover:-translate-y-1"
          >
            <div
              class="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
              style="background: color-mix(in srgb, var(--color-primary) 15%, transparent);"
            >
              <Icon :name="card.icon" class="w-7 h-7" :style="{ color: 'var(--color-primary)' }" />
            </div>
            <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-[color:var(--color-primary)] transition-colors">
              {{ $t(`features.${card.key}.title`) }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow text-base">
              {{ $t(`features.${card.key}.description`) }}
            </p>
            <div
              class="mt-5 flex items-center text-sm font-medium opacity-100 md:opacity-70 md:group-hover:opacity-100 transition-opacity"
              style="color: var(--color-primary);"
            >
              {{ $t('features.learn_more') }}
              <Icon name="lucide:arrow-right" class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </NuxtLinkLocale>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const cards = computed(() => [
  { key: 'mp4', icon: 'lucide:video', to: localePath('/youtube') },
  { key: 'tiktok', icon: 'simple-icons:tiktok', to: localePath('/tiktok') },
  { key: 'free', icon: 'lucide:gift', to: localePath('/') },
  { key: 'platforms', icon: 'lucide:globe', to: { path: localePath('/'), hash: '#platforms' } },
  { key: 'fast', icon: 'lucide:zap', to: localePath('/') },
  { key: 'no-reg', icon: 'lucide:user-check', to: localePath('/') },
])
</script>
