<template>
  <ApolloMutation
    :mutation="require('~/graphql/mutations/RemoveFromCart.gql')"
    tag=""
    :variables="{id}"
    :update="update"
    :optimistic-response="{
      __typename: 'Mutation',
      removeFromCart: {
        __typename: 'CartItem',
        id,
      },
    }"
  >
    <BigButton
      slot-scope="{ mutate, loading }"
      :disabled="loading"
      title="Delete Item"
      @click="mutate"
    >
      &times;
    </BigButton>
  </ApolloMutation>
</template>

<script>
import styled from 'vue-styled-components'
import theme from '~/assets/theme'

const BigButton = styled.button`
  font-style: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${theme.red};
    cursor: pointer;
  }
`

export default {
  components: {
    BigButton,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    update(cache, payload) {
      const currentUserQuery = require('~/graphql/queries/CurrentUser.gql')
      // first read the cache
      const data = cache.readQuery({
        query: currentUserQuery,
      })
      // remove item from the cart
      const cartItemId = payload.data.removeFromCart.id
      data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId)
      // write it back to the cache
      cache.writeQuery({ query: currentUserQuery, data })
    },
  },
}
</script>

<style>
</style>
