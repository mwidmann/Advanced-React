<template>
  <ApolloMutation :mutation="require('~/graphql/mutations/ToggleCart.gql')">
    <template slot-scope="{mutate}">
      <ApolloQuery :query="require('~/graphql/queries/LocalState.gql')">
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
import CartStyles from './styles/CartStyles'
import Supreme from './styles/Supreme'
import CloseButton from './styles/CloseButton'
import SickButton from './styles/SickButton'

export default {
  components: {
    CartStyles,
    Supreme,
    CloseButton,
    SickButton,
  },
}
</script>
