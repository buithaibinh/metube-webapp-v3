<template>
  <UApp>
    <div
      class="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-[#0d0d0d] dark:text-gray-100 font-sans"
    >
      <!-- Header/Navbar -->
      <header
        class="w-full px-2 md:px-6 py-3 md:py-4 flex items-center justify-between bg-white dark:bg-[#0d0d0d] border-b border-[#e5e7eb] dark:border-[#232323] relative z-20"
      >
        <!-- Logo -->
        <NuxtLinkLocale to="/" class="flex items-center gap-2">
          <Icon
            name="lucide:play-circle"
            class="w-7 h-7"
            :style="{ color: 'var(--color-primary)' }"
          />
          <span
            class="text-xl md:text-2xl font-extrabold tracking-wide text-gray-900 dark:text-white"
            >metube<span :style="{ color: 'var(--color-primary)' }"
              >.one</span
            ></span
          >
        </NuxtLinkLocale>
        <!-- Desktop Menu -->
        <nav
          class="hidden md:flex gap-4 lg:gap-6 text-base md:text-lg font-medium"
        >
          <NuxtLinkLocale
            v-for="item in navLinks"
            :key="item.slug"
            :to="item.to"
            class="transition"
            :style="{
              color: isNavActive(item) ? 'var(--color-primary)' : '',
            }"
            @mouseover="(e) => (e.target.style.color = 'var(--color-primary)')"
            @mouseleave="
              (e) =>
                (e.target.style.color = isNavActive(item)
                  ? 'var(--color-primary)'
                  : '')
            "
          >
            {{ item.label }}
          </NuxtLinkLocale>
        </nav>
        <!-- Right actions desktop -->
        <div class="hidden md:flex items-center gap-3 lg:gap-4">
          <LanguageSwitcher />
          <button
            type="button"
            class="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#181818] hover:bg-gray-200 dark:hover:bg-[#232323] transition border border-gray-200 dark:border-[#232323]"
            aria-label="Toggle theme"
            @click="toggleTheme"
          >
            <Icon
              v-if="colorMode.value !== 'dark'"
              name="lucide:moon"
              class="w-5 h-5"
              :style="{ color: 'var(--color-primary)' }"
            />
            <Icon v-else name="lucide:sun" class="w-5 h-5 text-[#facc15]" />
          </button>
        </div>
        <!-- Mobile: theme + menu -->
        <div class="md:hidden flex items-center gap-1">
          <button
            type="button"
            class="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#181818] hover:bg-gray-200 dark:hover:bg-[#232323] transition border border-gray-200 dark:border-[#232323]"
            aria-label="Toggle theme"
            @click="toggleTheme"
          >
            <Icon
              v-if="colorMode.value !== 'dark'"
              name="lucide:moon"
              class="w-5 h-5"
              :style="{ color: 'var(--color-primary)' }"
            />
            <Icon v-else name="lucide:sun" class="w-5 h-5 text-[#facc15]" />
          </button>
          <button
            type="button"
            class="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-[#232232] transition"
            aria-label="Open menu"
            @click="showMobileMenu = !showMobileMenu"
          >
            <Icon
              v-if="!showMobileMenu"
              name="lucide:menu"
              class="w-6 h-6"
              :style="{ color: 'var(--color-primary)' }"
            />
            <Icon
              v-else
              name="lucide:x"
              class="w-6 h-6"
              :style="{ color: 'var(--color-primary)' }"
            />
          </button>
        </div>
        <!-- Mobile menu dropdown -->
        <transition name="fade">
          <nav
            v-if="showMobileMenu"
            class="absolute top-full left-0 w-full bg-white dark:bg-[#181818] border-b border-[#e5e7eb] dark:border-[#232323] flex flex-col gap-2 py-3 px-4 shadow-lg md:hidden z-30 animate-fade-in"
          >
            <NuxtLinkLocale
              v-for="item in navLinks"
              :key="item.to"
              :to="item.to"
              class="py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-[#232232] transition"
              :style="{
                color: isNavActive(item) ? 'var(--color-primary)' : '',
              }"
              @click="showMobileMenu = false"
            >
              {{ item.label }}
            </NuxtLinkLocale>
            <div class="flex items-center gap-2 mt-2 pb-1">
              <LanguageSwitcher />
            </div>
          </nav>
        </transition>
      </header>

      <!-- Main content -->
      <main class="flex-1 w-full px-2 md:px-4 py-6 md:py-8">
        <slot />
      </main>

      <SiteFooter />
    </div>
  </UApp>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { PLATFORM_SLUGS } from '~/constants/platforms'

const colorMode = useColorMode()
const route = useRoute()
const { t: $t } = useI18n()
const localePath = useLocalePath()
const showMobileMenu = ref(false)

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const navLinks = computed(() => [
  ...PLATFORM_SLUGS.map((slug) => ({
    to: localePath(`/${slug}`),
    label: $t(`menu.${slug}`),
    slug,
  })),
  { to: localePath('/'), label: $t('menu.more'), slug: 'home' },
])

function isNavActive(item) {
  if (item.slug === 'home') {
    return route.path === localePath('/') || route.path === '/'
  }
  return route.path.includes(`/${item.slug}`)
}

watch(() => route.fullPath, () => {
  showMobileMenu.value = false
})

useLegacyRealtime()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@media (max-width: 768px) {
  .animate-fade-in {
    animation: fadeIn 0.2s;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
}
</style>
