
<template>
  <ApolloMutation
    :mutation="SIGNOUT_MUTATION"
    :refetch-queries="refetchQueries"
    tag=""
  >
    <button
      slot-scope="{ mutate }"
      type="button"
      @click="mutate"
    >
      Sign out
    </button>
  </ApolloMutation>
</template>

<script>
import gql from 'graphql-tag'
import { CURRENT_USER_QUERY } from './User'

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT {
    signout {
      message
    }
  }
`

export default {
  computed: {
    SIGNOUT_MUTATION() {
      return SIGNOUT_MUTATION
    },
  },
  methods: {
    refetchQueries() {
      return [{ query: CURRENT_USER_QUERY }]
    },
  },
}
</script>
