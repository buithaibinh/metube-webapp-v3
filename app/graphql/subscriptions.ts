export const onPublish = /* GraphQL */ `
  subscription OnPublish {
    onPublish {
      id
      text
      from
      kind
      to
      createdAt
      __typename
    }
  }
`
