import { defineStore } from 'pinia'
import { cognitoIdentityStorageKey } from '~/utils/amplifyConfig'
import { getLegacyAuth } from '~/utils/legacyAmplify.client'

export const useAuthStore = defineStore('auth', () => {
  const identityId = ref<string | null>(null)
  const ready = ref(false)

  async function ensureGuest() {
    if (import.meta.server) return identityId.value

    try {
      const Auth = await getLegacyAuth()
      const user = await Auth.currentAuthenticatedUser().catch(() => null)
      if (user) {
        const credentials = await Auth.currentUserCredentials()
        identityId.value = credentials.identityId ?? null
        ready.value = true
        return identityId.value
      }

      const credentials = await Auth.currentUserCredentials()
      identityId.value = credentials?.identityId ?? null
      ready.value = true
      return identityId.value
    } catch (error) {
      console.warn('[auth] guest credentials failed', error)
      ready.value = true
      return null
    }
  }

  /** New Cognito guest identity (same as v2 clear-all flow). */
  async function resetGuestIdentity() {
    if (import.meta.server) return

    const config = useRuntimeConfig()
    const poolId = config.public.cognitoIdentityPoolId
    if (poolId && typeof localStorage !== 'undefined') {
      localStorage.removeItem(cognitoIdentityStorageKey(poolId))
    }

    identityId.value = null
    ready.value = false
    await ensureGuest()
  }

  return {
    identityId,
    ready,
    ensureGuest,
    resetGuestIdentity,
  }
})
