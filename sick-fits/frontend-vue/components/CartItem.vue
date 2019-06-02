<template>
  <CartItemStyles>
    <img
      :src="cartItem.item.image"
      :alt="cartItem.item.title"
      width="100"
    >
    <div class="cart-item-details">
      <h3>{{ cartItem.item.title }}</h3>
      <p>
        {{ totalPrice }} - <em>{{ cartItem.quantity }} &times; {{ singlePrice }}</em>
      </p>
    </div>
    <RemoveFromCart :id="cartItem.id" />
  </CartItemStyles>
</template>

<script>
import styled from 'vue-styled-components'
import formatMoney from '../lib/formatMoney'
import theme from '~/assets/theme'
import RemoveFromCart from './RemoveFromCart'

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${theme.lightgrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`

export default {
  components: {
    CartItemStyles,
    RemoveFromCart,
  },
  props: {
    cartItem: {
      type: Object,
      required: true,
    },
  },
  computed: {
    totalPrice() {
      return formatMoney(this.cartItem.item.price * this.cartItem.quantity)
    },
    singlePrice() {
      return formatMoney(this.cartItem.item.price)
    },
  },
}
</script>

<style>
</style>
