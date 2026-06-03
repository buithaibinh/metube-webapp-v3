import { Amplify } from 'aws-amplify'
import { buildAmplifyConfig } from '~/utils/amplifyConfig'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  Amplify.configure(buildAmplifyConfig(config.public))
})
