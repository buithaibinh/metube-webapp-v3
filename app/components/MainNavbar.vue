<template>
  <nav
    class="w-full bg-white dark:bg-[#0d0d0d] border-b border-gray-200 dark:border-[#232232]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <NuxtLink to="/" class="flex items-center">
            <span class="text-2xl font-bold text-gray-900 dark:text-white">
              metube<span class="text-[#6c63ff]">.one</span>
            </span>
          </NuxtLink>
        </div>

        <div class="flex items-center space-x-4">
          <NuxtLink
            to="/youtube"
            class="flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#181828] transition-colors"
            :class="{
              'bg-gray-100 dark:bg-[#181828]': route.path === '/youtube',
            }"
          >
            <Icon name="lucide:youtube" class="w-5 h-5 text-[#ff0000] mr-2" />
            <span>{{ $t('menu.youtube') }}</span>
          </NuxtLink>

          <NuxtLink
            to="/facebook"
            class="flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#181828] transition-colors"
            :class="{
              'bg-gray-100 dark:bg-[#181828]': route.path === '/facebook',
            }"
          >
            <Icon name="lucide:facebook" class="w-5 h-5 text-[#1877f3] mr-2" />
            <span>Facebook</span>
          </NuxtLink>

          <NuxtLink
            to="/tiktok"
            class="flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#181828] transition-colors"
            :class="{
              'bg-gray-100 dark:bg-[#181828]': route.path === '/tiktok',
            }"
          >
            <Icon
              name="lucide:tiktok"
              class="w-5 h-5 text-[#000000] dark:text-[#fff] mr-2"
            />
            <span>TikTok</span>
          </NuxtLink>

          <button
            class="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#181818] hover:bg-gray-200 dark:hover:bg-[#232323] transition border border-gray-200 dark:border-[#232323]"
            @click="toggleTheme"
          >
            <Icon
              v-if="colorMode.value !== 'dark'"
              name="lucide:moon"
              class="w-5 h-5 text-[#6c63ff]"
            />
            <Icon v-else name="lucide:sun" class="w-5 h-5 text-[#facc15]" />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MainNavbar',
});

const route = useRoute();
const colorMode = useColorMode();

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}
</script>
