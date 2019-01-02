
<template>
  <apollo-mutation
    :mutation="SIGNOUT_MUTATION"
    :refetchQueries="refetchQueries"
    tag=""
  >
    <button type="button" @click="mutate" slot-scope="{ mutate }">Sign out</button>
  </apollo-mutation>
</template>

<script>
import { ApolloMutation } from 'vue-apollo'
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
  components: {
    ApolloMutation,
  },
  methods: {
    refetchQueries() {
      return [{ query: CURRENT_USER_QUERY }]
    },
  },
  computed: {
    SIGNOUT_MUTATION() {
      return SIGNOUT_MUTATION
    }
  }
}
</script>
