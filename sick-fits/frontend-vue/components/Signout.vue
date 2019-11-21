<template>
  <ApolloMutation
    :mutation="require('~/graphql/mutations/Signout.gql')"
    :refetch-queries="refetchQueries"
    tag=""
  >
    <button slot-scope="{ mutate }" type="button" @click="mutate">
      Sign out
    </button>
  </ApolloMutation>
</template>

<script>
export default {
  methods: {
    refetchQueries() {
      return [{ query: require('~/graphql/queries/CurrentUser.gql') }]
    },
  },
}
</script>
