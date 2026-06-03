/** Client-only Amplify loaders (avoids SSR `self is not defined`). */

export async function getLegacyApi() {
  const { API } = await import('aws-amplify')
  return API
}

export async function getLegacyAuth() {
  const { Auth } = await import('aws-amplify')
  return Auth
}

export async function getLegacyGraphql() {
  const { API, graphqlOperation } = await import('aws-amplify')
  return { API, graphqlOperation }
}
