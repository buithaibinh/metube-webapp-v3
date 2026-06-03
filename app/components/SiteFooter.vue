<template>
  <footer
    class="w-full py-8 md:py-10 border-t border-[#e5e7eb] dark:border-[#232323] bg-gray-50/80 dark:bg-[#0a0a0a]"
  >
    <div
      class="max-w-[1000px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400"
    >
      <p>
        © {{ year }} metube.one.
        {{ $t('footer.rights') }}
      </p>

      <nav class="flex flex-wrap items-center justify-center gap-4 md:gap-6">
        <NuxtLink
          to="/terms"
          class="cursor-pointer hover:text-[color:var(--color-primary)] transition"
        >
          {{ $t('legal.terms') }}
        </NuxtLink>
        <NuxtLink
          to="/policy"
          class="cursor-pointer hover:text-[color:var(--color-primary)] transition"
        >
          {{ $t('legal.policy') }}
        </NuxtLink>
        <a
          href="mailto:support@metube.one"
          class="hover:text-[color:var(--color-primary)] transition"
        >
          {{ $t('footer.contact') }}
        </a>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
