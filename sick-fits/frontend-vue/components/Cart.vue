<template>
  <CartStyles :open="true">
    <header>
      <CloseButton title="Close">
        &times;
      </CloseButton>
      <Supreme>Your cart</Supreme>
      <p>You have __ items in your cart.</p>
    </header>
    <footer>
      <p>$10.10</p>
      <SickButton type="button">
        Checkout
      </SickButton>
    </footer>
  </CartStyles>
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
