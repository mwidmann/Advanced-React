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

export default {
  components: {
    NavStyles,
    User,
    Signout,
  },
  methods: {
    log(data) {
      console.log(data)
    },
  },
}
</script>
