import type { RuntimeConfig } from 'nuxt/schema'

/** Build Amplify v5 config from public runtime (defaults match production v2). */
export function buildAmplifyConfig(publicConfig: RuntimeConfig['public']) {
  const region = publicConfig.cognitoRegion || 'us-east-1'

  return {
    Auth: {
      region,
      userPoolId: publicConfig.cognitoUserPoolId || 'us-east-1_z3AbsRmfN',
      userPoolWebClientId:
        publicConfig.cognitoUserPoolWebClientId || '2ab0lrm657ou9pfo05mra1j4cr',
      identityPoolId:
        publicConfig.cognitoIdentityPoolId || 'us-east-1:83858915-51d9-4527-a55f-c26f2f8f91b7',
      authenticationFlowType: 'USER_SRP_AUTH',
    },
    API: {
      endpoints: [
        {
          name: 'ytDlpApi',
          endpoint: (publicConfig.ytdlpApiUrl || 'https://yt-dlp-api.metube.one/').replace(
            /\/?$/,
            '/',
          ),
          custom_header: async () => ({
            'x-api-key': publicConfig.ytdlpApiKey || '',
          }),
        },
        {
          name: 'videoApi',
          endpoint: (
            publicConfig.videoApiUrl
            || 'https://bbmeugrcyg.execute-api.us-east-1.amazonaws.com/prod/'
          ).replace(/\/?$/, '/'),
        },
      ],
    },
    aws_appsync_graphqlEndpoint:
      publicConfig.appsyncGraphqlEndpoint
      || 'https://a7sm5mg3ejhmvfbhgwdgegl3z4.appsync-api.us-east-1.amazonaws.com/graphql',
    aws_appsync_region: region,
    aws_appsync_authenticationType: 'API_KEY',
    aws_appsync_apiKey: publicConfig.appsyncApiKey || '',
  }
}

export function cognitoIdentityStorageKey(identityPoolId: string) {
  return `CognitoIdentityId-${identityPoolId}`
}
