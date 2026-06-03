import { onPublish } from '~/graphql/subscriptions'
import type { LegacyDownloadRecord } from '~/types/api'
import { getLegacyGraphql } from '~/utils/legacyAmplify.client'

/** AppSync subscription for download job updates (legacy v2). */
export function useLegacyRealtime() {
  const authStore = useAuthStore()
  const downloadsStore = useDownloadsStore()
  let publishSubscription: { unsubscribe: () => void } | null = null

  onMounted(async () => {
    await authStore.ensureGuest()

    const { API, graphqlOperation } = await getLegacyGraphql()

    publishSubscription = (
      API.graphql(graphqlOperation(onPublish)) as {
        subscribe: (handlers: {
          next: (event: { value: { data: { onPublish: { text: string } } } }) => void
          error: (err: unknown) => void
        }) => { unsubscribe: () => void }
      }
    ).subscribe({
      next: ({ value }) => {
        const text = value?.data?.onPublish?.text
        if (!text) return

        try {
          const data = JSON.parse(text) as LegacyDownloadRecord & {
            kind?: string
            userId?: string
          }

          if (data.kind === 'video' && data.userId === authStore.identityId) {
            downloadsStore.applyRealtimeUpdate(data)
          }
        } catch (error) {
          console.warn('[appsync] parse failed', error)
        }
      },
      error: (error) => console.warn('[appsync] subscription error', error),
    })
  })

  onUnmounted(() => {
    publishSubscription?.unsubscribe()
    publishSubscription = null
  })
}
