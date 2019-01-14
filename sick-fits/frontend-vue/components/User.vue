<template>
  <ApolloQuery
    :query="require('~/graphql/queries/CurrentUser.gql')"
    tag=""
  >
    <template slot-scope="payload">
      <slot :payload="payload.result"></slot>
    </template>
  </ApolloQuery>
</template>

<script>
export default {}
</script>
