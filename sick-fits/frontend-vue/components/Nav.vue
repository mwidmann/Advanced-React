<template>
  <nav-styles>
    <user>
      <template slot-scope="{ payload: { data } }">
        <p v-if="data">{{data.me.name}}</p>
      </template>
    </user>
    <nuxt-link to="/items">Shop</nuxt-link>
    <nuxt-link to="/sell">sell</nuxt-link>
    <nuxt-link to="/signup">signup</nuxt-link>
    <nuxt-link to="/orders">orders</nuxt-link>
    <nuxt-link to="/me">me</nuxt-link>
  </nav-styles>
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
