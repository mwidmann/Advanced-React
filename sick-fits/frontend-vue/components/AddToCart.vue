<template>
  <ApolloMutation
    :mutation="require('~/graphql/mutations/AddToCart.gql')"
    :variables="{id}"
    tag=""
    :refetch-queries="refetchQueries"
  >
    <button
      slot-scope="{ mutate, loading }"
      type="button"
      :disabled="loading"
      @click="mutate"
    >
      Add{{ loading ? 'ing' : '' }} To Cart! 🚧
    </button>
  </ApolloMutation>
</template>

<script>
import CURRENT_USER_QUERY from '~/graphql/queries/CurrentUser'
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    refetchQueries() {
      return () => [{ query: CURRENT_USER_QUERY }]
    },
  },
}
</script>
