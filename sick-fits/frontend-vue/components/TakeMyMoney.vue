<template>
  <User>
    <div slot-scope="{ payload: { data: meData } }">
      <StripeCheckout
        :amount="calcTotalPrice(meData.me.cart)"
        name="Sick Fits"
        :description="`Order of ${totalItems(meData.me.cart)} items`"
        :image="
          meData.me.cart.filter(cartItem => cartItem.item !== null)[0].item
            .image
        "
        stripe-key="pk_test_DgF0Hxa43J6brnyRXufBZDAt"
        currency="USD"
        :email="meData.me.email"
        :token="onToken"
        ><slot
      /></StripeCheckout>
    </div>
  </User>
</template>

<script>
import calcTotalPrice from '../lib/calcTotalPrice'
import StripeCheckout from './StripeCheckout'
// import Error from './ErrorMessage'
// import User, { CURRENT_USER_QUERY } from './User'
import User from './User'
export default {
  components: {
    User,
    // Error,
    StripeCheckout,
  },
  methods: {
    onToken(res) {
      console.log(res)
    },
    calcTotalPrice,
    totalItems(cart) {
      return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)
    },
  },
}
</script>
