<template>
  <UDropdownMenu :items="languageItems" :popper="{ placement: 'bottom-start' }">
    <UButton
      color="neutral"
      variant="ghost"
      trailing-icon="i-heroicons-language"
      :label="currentLanguage?.name || ''"
    />
  </UDropdownMenu>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const currentLanguage = computed(() => {
  return locales.value.find((l) => l.code === locale.value) || locales.value[0]
})

const languageItems = computed(() => {
  return locales.value.map((l) => ({
    label: l.name,
    icon: l.code === locale.value ? 'i-heroicons-check' : '',
    to: switchLocalePath(l.code)
  }))
})
</script>