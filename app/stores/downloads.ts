import { defineStore } from 'pinia'
import type { DownloadItem, LegacyDownloadRecord, ServerDownloadOptions } from '~/types/api'

function normalizeFromRealtime(raw: LegacyDownloadRecord): DownloadItem {
  const percent = raw.status === 'finished' ? 100 : raw.status === 'downloading' ? 55 : 15
  return {
    uid: raw.id,
    url: raw.url,
    title: raw.title,
    thumbnail: raw.thumbnail,
    status: raw.status,
    progress: { status: raw.status, percent },
    download_url: raw.downloadUrl ?? null,
    error_message: raw.msg || null,
  }
}

export const useDownloadsStore = defineStore('downloads', () => {
  const items = ref<DownloadItem[]>([])
  const loading = ref(false)

  const api = useDownloaderApi()
  const authStore = useAuthStore()

  function upsert(item: DownloadItem) {
    const index = items.value.findIndex((i) => i.uid === item.uid)
    if (index >= 0) {
      items.value[index] = { ...items.value[index], ...item }
    } else {
      items.value.unshift(item)
    }
  }

  function applyRealtimeUpdate(raw: LegacyDownloadRecord) {
    upsert(normalizeFromRealtime(raw))
  }

  async function refresh() {
    loading.value = true
    try {
      await authStore.ensureGuest()
      items.value = await api.listDownloads()
    } finally {
      loading.value = false
    }
  }

  async function queue(video: Parameters<typeof api.createDownload>[0], options: ServerDownloadOptions) {
    const created = await api.createDownload(video, options)
    upsert(created)
    return created
  }

  function remove(uid: string) {
    items.value = items.value.filter((item) => item.uid !== uid)
  }

  async function clearAll() {
    items.value = []
    await authStore.resetGuestIdentity()
    await refresh()
  }

  return {
    items,
    loading,
    refresh,
    queue,
    remove,
    clearAll,
    applyRealtimeUpdate,
  }
})
