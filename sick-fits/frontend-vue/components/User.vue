<template>
  <ApolloQuery :query="CURRENT_USER_QUERY">
    <template slot-scope="payload">
      <slot :payload="payload.result"></slot>
    </template>
  </ApolloQuery>
</template>

<script>
import gql from 'graphql-tag'
const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
    }
  }
`

export default {
  computed: {
    CURRENT_USER_QUERY() {
      return CURRENT_USER_QUERY
    },
  },
}

export { CURRENT_USER_QUERY }
</script>
