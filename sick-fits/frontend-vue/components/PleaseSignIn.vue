<template>
  <ApolloQuery :query="require('~/graphql/queries/CurrentUser.gql')">
    <template slot-scope="{ result: { loading, error, data } }">
      <p v-if="loading">
        loading...
      </p>
      <div v-else-if="data && !data.me">
        <p>Please sign in</p>
        <Signin></Signin>
      </div>
      <template v-else-if="data && data.me">
        <slot></slot>
      </template>
    </template>
  </ApolloQuery>
</template>

<script>
import Signin from './Signin'
export default {
  components: {
    Signin,
  },
}
</script>
