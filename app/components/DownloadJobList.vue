<template>
  <section v-if="store.items.length" class="w-full max-w-4xl mx-auto mt-8">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
      <h2 class="text-lg font-bold text-gray-900 dark:text-gray-100">
        {{ $t('downloads.title') }}
      </h2>
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-[color:var(--color-primary)] disabled:opacity-50"
          :disabled="store.loading"
          @click="onRefresh"
        >
          <Icon
            name="lucide:refresh-cw"
            class="w-4 h-4"
            :class="{ 'animate-spin': store.loading }"
          />
          {{ $t('downloads.refresh') }}
        </button>
        <button
          type="button"
          class="text-sm text-red-500 hover:underline"
          @click="onClearAll"
        >
          {{ $t('downloads.clear_all') }}
        </button>
      </div>
    </div>

    <ul class="flex flex-col gap-3">
      <li
        v-for="item in store.items"
        :key="item.uid"
        class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-4 shadow-sm"
      >
        <div class="flex gap-4">
          <img
            v-if="item.thumbnail"
            :src="item.thumbnail"
            :alt="item.title || 'thumbnail'"
            class="w-28 h-16 object-cover rounded-lg shrink-0 hidden sm:block"
          >
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
              {{ item.title || item.url }}
            </p>
            <p class="text-xs text-gray-500 mt-1">
              {{ item.format?.toUpperCase() }}
              <span v-if="item.resolution"> · {{ item.resolution }}</span>
            </p>

            <div v-if="item.status === 'finished' && item.download_url" class="mt-3">
              <a
                :href="item.download_url"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700"
              >
                {{ $t('download') }}
              </a>
            </div>

            <div v-else-if="item.status === 'failed'" class="mt-2 text-sm text-red-500">
              {{ item.error_message || $t('downloads.failed') }}
            </div>

            <div v-else class="mt-3">
              <div class="h-2 rounded-full bg-gray-200 dark:bg-zinc-700 overflow-hidden">
                <div
                  class="h-full bg-purple-600 transition-all duration-300"
                  :style="{ width: `${Math.min(100, item.progress?.percent || 0)}%` }"
                />
              </div>
              <p class="text-xs text-gray-500 mt-1 capitalize">
                {{ item.status }} · {{ Math.round(item.progress?.percent || 0) }}%
              </p>
            </div>
          </div>

          <button
            type="button"
            class="text-gray-400 hover:text-red-500 shrink-0"
            :aria-label="$t('downloads.remove')"
            @click="store.remove(item.uid)"
          >
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>
      </li>
    </ul>

  </section>
</template>

<script setup lang="ts">
const store = useDownloadsStore()
const authStore = useAuthStore()
const { t: $t } = useI18n()

onMounted(async () => {
  await authStore.ensureGuest()
  await store.refresh()
})

async function onRefresh() {
  await store.refresh()
}

async function onClearAll() {
  if (!confirm($t('downloads.clear_confirm'))) return
  await store.clearAll()
  trackDownloadEvent('clearAll')
}
</script>
