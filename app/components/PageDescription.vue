<template>
  <section class="w-full mt-6 md:mt-8 text-left">
    <h3
      class="text-lg sm:text-2xl font-bold mb-2"
      style="color: var(--color-primary)"
    >
      {{ $t(descTitleKey) }}
    </h3>
    <p
      class="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed"
    >
      {{ $t(descKey) }}
    </p>
  </section>
</template>

<script setup>
defineProps({
  guideTitleKey: { type: String, required: true },
  guideDescKey: { type: String, required: true },
  descTitleKey: { type: String, required: true },
  descKey: { type: String, required: true },
});
const { t: $t } = useI18n();
</script>
