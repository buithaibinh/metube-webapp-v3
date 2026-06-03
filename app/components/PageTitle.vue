<template>
  <div>
    <h1
      class="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-center mt-6 md:mt-10 mb-2 md:mb-3 leading-tight"
    >
      <slot name="title">
        metube<span style="color: var(--color-primary)">.one</span>
      </slot>
    </h1>
    <p
      class="text-gray-500 dark:text-gray-400 text-base sm:text-lg md:text-xl text-center max-w-3xl mx-auto mb-5 md:mb-8 font-medium"
    >
      <slot name="subtitle">{{ subtitle }}</slot>
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  subtitle: { type: String, default: '' }
})
</script>