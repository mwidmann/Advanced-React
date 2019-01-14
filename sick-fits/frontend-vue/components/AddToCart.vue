<template>
  <ApolloMutation
    :mutation="require('~/graphql/mutations/AddToCart.gql')"
    :variables="{id}"
    tag=""
  >
    <button
      slot-scope="{ mutate }"
      type="button"
      @click="mutate"
    >
      <slot></slot>
      <!-- Add To Cart! 🚧 -->
    </button>
  </ApolloMutation>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
}
</script>
