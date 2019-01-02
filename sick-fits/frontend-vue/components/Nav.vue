<template>
    <user>
      <template slot-scope="{ payload: { data } }">
        <nav-styles>
          <nuxt-link to="/items">Shop</nuxt-link>
          <template v-if="data && data.me">
            <nuxt-link to="/sell">sell</nuxt-link>
            <nuxt-link to="/me">me</nuxt-link>
            <nuxt-link to="/orders">orders</nuxt-link>
          </template>
          <nuxt-link to="/signup" v-if="!data || !data.me">Sign in</nuxt-link>
        </nav-styles>
      </template>
    </user>
</template>

<script>
import NavStyles from './styles/NavStyles'
import User from './User'

export default {
  components: {
    NavStyles,
    User
  },
  methods: {
    log(data) {console.log(data)}
  }
}
</script>
