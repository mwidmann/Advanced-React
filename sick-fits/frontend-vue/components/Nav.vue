<template>
  <nav-styles>
    <nuxt-link to="/items">Shop</nuxt-link>
    <nuxt-link to="/sell">sell</nuxt-link>
    <nuxt-link to="/signup">signup</nuxt-link>
    <nuxt-link to="/orders">orders</nuxt-link>
    <nuxt-link to="/me">me</nuxt-link>
  </nav-styles>
</template>

<script>
import NavStyles from './styles/NavStyles'
export default {
  components: {
    NavStyles
  }
}
</script>
