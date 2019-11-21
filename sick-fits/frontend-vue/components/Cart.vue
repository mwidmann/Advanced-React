<template>
  <User>
    <div slot-scope="{ payload: { data: meData } }">
      <ApolloMutation
        v-if="meData && meData.me"
        :mutation="require('~/graphql/mutations/ToggleCart.gql')"
      >
        <template slot-scope="{ mutate }">
          <ApolloQuery :query="require('~/graphql/queries/LocalState.gql')">
            <template slot-scope="{ result: { data } }">
              <CartStyles :open="data.cartOpen">
                <header>
                  <CloseButton title="Close" @click="mutate">
                    &times;
                  </CloseButton>
                  <Supreme>{{ meData.me.name }}'s cart</Supreme>
                  <p>
                    You have {{ meData.me.cart.length }} items in your cart.
                  </p>
                </header>
                <ul>
                  <CartItem
                    v-for="cartItem in meData.me.cart"
                    :key="cartItem.id"
                    :cart-item="cartItem"
                  />
                </ul>
                <footer>
                  <p>{{ getTotalPrice(meData.me.cart) }}</p>
                  <SickButton type="button">
                    Checkout
                  </SickButton>
                </footer>
              </CartStyles>
            </template>
          </ApolloQuery>
        </template>
      </ApolloMutation>
    </div>
  </User>
</template>

<script>
import formatMoney from '../lib/formatMoney'
import calcTotalPrice from '../lib/calcTotalPrice'
import CartStyles from './styles/CartStyles'
import Supreme from './styles/Supreme'
import CloseButton from './styles/CloseButton'
import SickButton from './styles/SickButton'
import User from './User'
import CartItem from './CartItem'

export default {
  components: {
    CartStyles,
    Supreme,
    CloseButton,
    SickButton,
    User,
    CartItem,
  },
  methods: {
    getTotalPrice(cart) {
      return formatMoney(calcTotalPrice(cart))
    },
  },
}
</script>
