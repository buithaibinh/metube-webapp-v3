<template>
  <div
    class="flex items-center gap-2 sm:gap-3 bg-gray-100 dark:bg-[#181828] border rounded-xl px-3 sm:px-6 py-2 sm:py-3 mb-6 md:mb-10 shadow-lg"
    style="border-color: var(--color-primary-dark)"
  >
    <span class="text-yellow-500 dark:text-yellow-400 text-xl sm:text-2xl">⚡</span>
    <span
      class="text-gray-800 dark:text-gray-100 font-bold tracking-wide uppercase text-xs sm:text-base md:text-lg leading-tight"
    >{{ $t(messageKey) }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  messageKey: {
    type: String,
    default: 'index.copyright_warning',
  },
})
</script>