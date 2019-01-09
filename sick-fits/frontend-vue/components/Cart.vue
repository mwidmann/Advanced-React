<template>
  <ApolloMutation :mutation="TOGGLE_CART_MUTATION">
    <template slot-scope="{mutate}">
      <ApolloQuery :query="QUERY_LOCAL_STATE">
        <template slot-scope="{result: {data}}">
          <CartStyles
            :open="data.cartOpen"
          >
            <header>
              <CloseButton
                title="Close"
                @click="mutate"
              >
                &times;
              </CloseButton>
              <Supreme>Your cart</Supreme>
              <p>You have __ items in your cart.</p>
            </header>
            <footer>
              <p>$10.10</p>
              <SickButton
                type="button"
              >
                Checkout
              </SickButton>
            </footer>
          </CartStyles>
        </template>
      </ApolloQuery>
    </template>
  </ApolloMutation>
</template>

<script>
import gql from 'graphql-tag'
import CartStyles from './styles/CartStyles'
import Supreme from './styles/Supreme'
import CloseButton from './styles/CloseButton'
import SickButton from './styles/SickButton'
import { QUERY_LOCAL_STATE } from '../graphql/queries'
import { TOGGLE_CART_MUTATION } from '../graphql/mutations'

export default {
  components: {
    CartStyles,
    Supreme,
    CloseButton,
    SickButton,
  },
  computed: {
    QUERY_LOCAL_STATE() {
      return QUERY_LOCAL_STATE
    },
    TOGGLE_CART_MUTATION() {
      return TOGGLE_CART_MUTATION
    },
  },
  methods: {
    log(what) {
      console.log(what)
    },
  },
}
</script>
