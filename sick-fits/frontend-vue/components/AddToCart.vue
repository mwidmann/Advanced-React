<template>
  <ApolloMutation
    :mutation="ADD_TO_CART_MUTATION"
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
import gql from 'graphql-tag'

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(id: $id) {
      quantity
    }
  }
`

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ADD_TO_CART_MUTATION() {
      return ADD_TO_CART_MUTATION
    },
  },
}
</script>
