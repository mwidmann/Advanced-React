<template>
  <ApolloQuery
    :query="CURRENT_USER_QUERY"
  >
    <template slot-scope="{result: {loading, error, data}}">
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
import { CURRENT_USER_QUERY } from './User'
export default {
  components: {
    Signin,
  },
  computed: {
    CURRENT_USER_QUERY() {
      return CURRENT_USER_QUERY
    },
  },
}
</script>
