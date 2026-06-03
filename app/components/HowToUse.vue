<template>
  <section class="py-16 md:py-24 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0" style="background: linear-gradient(to bottom, color-mix(in srgb, var(--color-primary) 5%, transparent), transparent, color-mix(in srgb, var(--color-primary) 5%, transparent));"></div>
    <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl animate-pulse" style="background: var(--color-primary-light);"></div>
    <div class="absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-3xl animate-pulse" style="background: var(--color-primary-light); animation-delay: 1s"></div>

    <div class="max-w-[1000px] mx-auto px-4 relative">
      <!-- Section header -->
      <div class="text-center mb-16">
        <span class="inline-block px-4 py-1 rounded-full font-semibold tracking-wider uppercase text-sm mb-4" style="background: color-mix(in srgb, var(--color-primary) 10%, transparent); color: var(--color-primary);">
          {{ $t('how_to_use.subtitle') }}
        </span>
        <h2 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white bg-clip-text text-transparent" style="background-image: linear-gradient(to right, var(--color-primary), var(--color-primary-dark));">
          {{ $t('how_to_use.title') }}
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          {{ $t('how_to_use.description') }}
        </p>
      </div>

      <!-- Steps -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Step 1 -->
        <div class="group relative">
          <div class="absolute inset-0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" style="background: linear-gradient(to right, var(--color-primary), var(--color-primary-dark));"/>
          <div class="relative bg-white dark:bg-[#181818] p-8 rounded-2xl border border-gray-100 dark:border-[#232323] hover:border-[color:var(--color-primary)] transition duration-300 hover:shadow-lg hover:shadow-[color:var(--color-primary-light)] transform group-hover:scale-[1.02] group-hover:-translate-y-1 transition-all duration-300">
            <div class="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300" style="background: linear-gradient(to bottom right, color-mix(in srgb, var(--color-primary) 20%, transparent), color-mix(in srgb, var(--color-primary) 10%, transparent));">
              <Icon name="lucide:link" class="w-8 h-8" :style="{ color: 'var(--color-primary)' }" />
            </div>
            <div class="flex items-center mb-4">
              <span class="w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3" style="background: var(--color-primary); color: #fff;">1</span>
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white group-hover:[color:var(--color-primary)] transition duration-300">
                {{ $t('how_to_use.step1.title') }}
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              {{ $t('how_to_use.step1.description') }}
              <NuxtLinkLocale
                :to="{ path: localePath('/'), hash: '#download' }"
                class="block mt-2 text-sm font-semibold underline"
                style="color: var(--color-primary);"
              >
                {{ $t('how_to_use.go_to_downloader') }} →
              </NuxtLinkLocale>
            </p>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="group relative">
          <div class="absolute inset-0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" style="background: linear-gradient(to right, var(--color-primary), var(--color-primary-dark));" />
          <div class="relative bg-white dark:bg-[#181818] p-8 rounded-2xl border border-gray-100 dark:border-[#232323] hover:border-[color:var(--color-primary)] transition duration-300 hover:shadow-lg hover:shadow-[color:var(--color-primary-light)] transform group-hover:scale-[1.02] group-hover:-translate-y-1 transition-all duration-300">
            <div class="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300" style="background: linear-gradient(to bottom right, color-mix(in srgb, var(--color-primary) 20%, transparent), color-mix(in srgb, var(--color-primary) 10%, transparent));">
              <Icon name="lucide:settings" class="w-8 h-8" :style="{ color: 'var(--color-primary)' }" />
            </div>
            <div class="flex items-center mb-4">
              <span class="w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3" style="background: var(--color-primary); color: #fff;">2</span>
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white group-hover:[color:var(--color-primary)] transition duration-300">
                {{ $t('how_to_use.step2.title') }}
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              {{ $t('how_to_use.step2.description') }}
            </p>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="group relative">
          <div class="absolute inset-0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" style="background: linear-gradient(to right, var(--color-primary), var(--color-primary-dark));" />
          <div class="relative bg-white dark:bg-[#181818] p-8 rounded-2xl border border-gray-100 dark:border-[#232323] hover:border-[color:var(--color-primary)] transition duration-300 hover:shadow-lg hover:shadow-[color:var(--color-primary-light)] transform group-hover:scale-[1.02] group-hover:-translate-y-1 transition-all duration-300">
            <div class="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300" style="background: linear-gradient(to bottom right, color-mix(in srgb, var(--color-primary) 20%, transparent), color-mix(in srgb, var(--color-primary) 10%, transparent));">
              <Icon name="lucide:download" class="w-8 h-8" :style="{ color: 'var(--color-primary)' }" />
            </div>
            <div class="flex items-center mb-4">
              <span class="w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3" style="background: var(--color-primary); color: #fff;">3</span>
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white group-hover:[color:var(--color-primary)] transition duration-300">
                {{ $t('how_to_use.step3.title') }}
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              {{ $t('how_to_use.step3.description') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
</style>