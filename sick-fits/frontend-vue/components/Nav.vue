<template>
  <User>
    <NavStyles slot-scope="{ payload: { data } }">
      <nuxt-link to="/items">
        Shop
      </nuxt-link>
      <template v-if="data && data.me">
        <nuxt-link to="/sell">
          sell
        </nuxt-link>
        <nuxt-link to="/me">
          me
        </nuxt-link>
        <nuxt-link to="/orders">
          orders
        </nuxt-link>
        <Signout></Signout>
        <ApolloMutation :mutation="TOGGLE_CART_MUTATION">
          <button
            slot-scope="{mutate}"
            @click="mutate"
          >
            My Cart
          </button>
        </ApolloMutation>
      </template>
      <nuxt-link
        v-if="!data || !data.me"
        to="/signup"
      >
        Sign in
      </nuxt-link>
    </NavStyles>
  </User>
</template>

<script>
import NavStyles from './styles/NavStyles'
import User from './User'
import Signout from './Signout'
import { TOGGLE_CART_MUTATION } from '../graphql/mutations'

export default {
  components: {
    NavStyles,
    User,
    Signout,
  },
  computed: {
    TOGGLE_CART_MUTATION() {
      return TOGGLE_CART_MUTATION
    },
  },
}
</script>
