<template>
  <component
    :is="componentClass"
    v-if="$slots.default"
    @tab="triggerEvent === 'onTab' && onClick()"
    @click="triggerEvent === 'onClick' && onClick()"
  >
    <slot />
  </component>
  <button v-else-if="stripe - checkout - disabled" disabled class="disabled">
    <span>
      {{ label }}
    </span>
  </button>
  <button
    v-else
    class="StripeCheckout stripe-checkout"
    :class="{ active: buttonActive }"
    :style="styles"
    @mousedown="handleMouseDown"
    @focus="handleMouseDown"
    @mouseup="handleMouseUp"
    @mouseout="handleMouseUp"
    @blur="handleMoudeUp"
    @tab="triggerEvent === 'onTab' && onClick()"
    @click="triggerEvent === 'onClick' && onClick()"
  >
    {{ label }}
  </button>
</template>

<script>
let scriptLoading = false
let scriptLoaded = false
let scriptDidError = false
window.stripeHandler = undefined

export default {
  loadPromise: undefined,
  props: {
    desktopShowModal: {
      type: Boolean,
      default: false,
    },
    triggerEvent: {
      type: String,
      validator(value) {
        return ['onClick', 'onTouchTap'].includes(value)
      },
      default: 'onClick',
    },
    styles: {
      type: Object,
      default() {
        return {}
      },
    },
    label: {
      type: String,
      default: 'Pay With Card',
    },
    textStyle: {
      type: Object,
      default() {
        return {}
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    componentClass: {
      type: String,
      default: 'span',
    },
    showLoadingDialog: {
      type: Function,
      default: () => {},
    },
    hideLoadingDialog: {
      type: Function,
      default: () => {},
    },
    onScriptError: {
      type: Function,
      default: () => {},
    },
    onScriptTagCreated: {
      type: Function,
      default: () => {},
    },
    reconfigureOnUpdate: {
      type: Boolean,
      default: false,
    },
    // stripe required props
    stripeKey: {
      type: String,
      required: true,
    },
    token: {
      type: Function,
      required: true,
    },

    // stripe highly recommended
    name: {
      type: String,
      default: undefined,
    },
    description: {
      type: String,
      default: undefined,
    },
    image: {
      type: String,
      default: undefined,
    },
    amount: {
      type: Number,
      default: undefined,
    },
    locale: {
      type: String,
      default: 'auto',
      validator(value) {
        return [
          'auto', // (Default) Automatically chosen by checkout
          'zh', // Simplified Chinese
          'da', // Danish
          'nl', // Dutch
          'en', // English
          'fr', // French
          'de', // German
          'it', // Italian
          'ja', // Japanease
          'no', // Norwegian
          'es', // Spanish
          'sv', // Swedish
        ].includes(value)
      },
    },

    // stripe optional
    currency: {
      type: String,
      default: 'USD',
      validator(value) {
        return [
          'AED',
          'AFN',
          'ALL',
          'AMD',
          'ANG',
          'AOA',
          'ARS',
          'AUD',
          'AWG',
          'AZN',
          'BAM',
          'BBD',
          'BDT',
          'BGN',
          'BIF',
          'BMD',
          'BND',
          'BOB',
          'BRL',
          'BSD',
          'BWP',
          'BZD',
          'CAD',
          'CDF',
          'CHF',
          'CLP',
          'CNY',
          'COP',
          'CRC',
          'CVE',
          'CZK',
          'DJF',
          'DKK',
          'DOP',
          'DZD',
          'EGP',
          'ETB',
          'EUR',
          'FJD',
          'FKP',
          'GBP',
          'GEL',
          'GIP',
          'GMD',
          'GNF',
          'GTQ',
          'GYD',
          'HKD',
          'HNL',
          'HRK',
          'HTG',
          'HUF',
          'IDR',
          'ILS',
          'INR',
          'ISK',
          'JMD',
          'JPY',
          'KES',
          'KGS',
          'KHR',
          'KMF',
          'KRW',
          'KYD',
          'KZT',
          'LAK',
          'LBP',
          'LKR',
          'LRD',
          'LSL',
          'MAD',
          'MDL',
          'MGA',
          'MKD',
          'MMK',
          'MNT',
          'MOP',
          'MRO',
          'MUR',
          'MVR',
          'MWK',
          'MXN',
          'MYR',
          'MZN',
          'NAD',
          'NGN',
          'NIO',
          'NOK',
          'NPR',
          'NZD',
          'PAB',
          'PEN',
          'PGK',
          'PHP',
          'PKR',
          'PLN',
          'PYG',
          'QAR',
          'RON',
          'RSD',
          'RUB',
          'RWF',
          'SAR',
          'SBD',
          'SCR',
          'SEK',
          'SGD',
          'SHP',
          'SLL',
          'SOS',
          'SRD',
          'STD',
          'SVC',
          'SZL',
          'THB',
          'TJS',
          'TOP',
          'TRY',
          'TTD',
          'TWD',
          'TZS',
          'UAH',
          'UGX',
          'USD',
          'UYU',
          'UZS',
          'VND',
          'VUV',
          'WST',
          'XAF',
          'XCD',
          'XOF',
          'XPF',
          'YER',
          'ZAR',
          'ZMW',
        ].includes(value)
      },
    },
    panelLabel: {
      type: String,
      default: undefined,
    },
    zipCode: {
      type: Boolean,
      default: false,
    },
    billingAddress: {
      type: Boolean,
      default: false,
    },
    shippingAddress: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      default: undefined,
    },
    allowRememberMe: {
      type: Boolean,
      default: true,
    },
    bitCoin: {
      type: Boolean,
      default: false,
    },
    alipay: {
      type: [Boolean, String],
      default: false,
      validator(value) {
        return ['auto', true, false].includes(value)
      },
    },
    alipayReusable: {
      type: Boolean,
      default: false,
    },
    opened: {
      type: Function,
      default: () => {},
    },
    closed: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      open: false,
      buttonActive: false,
    }
  },
  mounted() {
    this.isMounted = true
    if (scriptLoaded) {
      return this.updateStripeHandler()
    }

    if (scriptLoading) {
      return
    }

    scriptLoading = true
    const script = document.createElement('script')
    this.onScriptTagCreated(script)
    script.src = 'https://checkout.stripe.com/checkout.js'
    script.async = 1

    this.loadPromise = (() => {
      let canceled = false
      const promise = new Promise((resolve, reject) => {
        script.onload = () => {
          scriptLoaded = true
          scriptLoading = false
          resolve()
          this.onScriptLoaded()
        }
        script.onError = event => {
          scriptDidError = true
          scriptLoading = false
          reject(event)
          this._onScriptError(event)
        }
      })
      const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(() =>
          // eslint-disable-next-line prefer-promise-reject-errors
          canceled ? reject({ isCanceled: true }) : resolve()
        )
        promise.catch(error =>
          // eslint-disable-next-line prefer-promise-reject-errors
          canceled ? reject({ isCanceled: true }) : reject(error)
        )
      })
      return {
        promise: wrappedPromise,
        cancel() {
          canceled = true
        },
      }
    })()

    this.loadPromise.promise.then(this.onScriptLoaded).catch(this.onScriptError)
    document.body.appendChild(script)
  },
  updated() {
    if (!scriptLoading) {
      this.updateStripeHandler()
    }
  },
  beforeDestroy() {
    this.isMounted = false
    if (this.loadPromise) {
      this.loadPromise.cancel()
    }
    if (window.stripeHandler && this.open) {
      window.stripeHandler.close()
    }
  },
  methods: {
    onScriptLoaded() {
      if (!window.stripeHandler) {
        window.stripeHandler = window.StripeCheckout.configure({
          key: this.stripeKey,
        })
        if (this.hasPendingClick) {
          this.showStripeDialog()
        }
      }
    },
    _onScriptError(...args) {
      this.hideLoadingDialog()
      this.onScriptError.apply(this, args)
    },

    onClosed(...args) {
      if (this.isMounted) {
        this.open = false
      }
      this.closed.apply(this, args)
    },

    onOpened(...args) {
      this.open = true
      this.opened.apply(this, args)
    },

    getConfig() {
      return [
        'token',
        'image',
        'name',
        'description',
        'amount',
        'locale',
        'currency',
        'panelLabel',
        'zipCode',
        'shippingAddress',
        'billingAddress',
        'email',
        'allowRememberMe',
        'bitcoin',
        'alipay',
        'alipayReusable',
      ].reduce(
        (config, key) =>
          Object.assign(
            {},
            config,
            Object.prototype.hasOwnProperty.call(this.$props, key) && {
              [key]: this[key],
            }
          ),
        {
          opened: this.onOpened,
          closed: this.onClosed,
        }
      )
    },

    updateStripeHandler() {
      if (!window.stripeHandler || this.reconfigureOnUpdate) {
        window.stripeHandler = window.StripeCheckout.configure({
          key: this.stripeKey,
        })
      }
    },

    showStripeDialog() {
      this.hideLoadingDialog()
      window.stripeHandler.open(this.getConfig())
    },

    onClick() {
      if (this.disabled) {
        return
      }
      if (scriptDidError) {
        throw new Error(
          'Tried to call onClick, but StripeCheckout failed to load'
        )
      } else if (window.stripeHandler) {
        this.showStripeDialog()
      } else {
        this.showLoadingDialog()
        this.hasPendingClick = true
      }
    },

    handleMouseDown() {
      this.buttonActive = true
    },

    handleMoudeUp() {
      this.buttonActive = false
    },
  },
}
</script>

<style>
button.stripe-checkout,
button.stripe-checkout-disabled {
  overflow: hidden;
  display: inline-block;
  border: 0;
  padding: 1px;
  text-decoration: none;
  border-radius: 5px;
  user-select: none;
}
button.stripe-checkout {
  background: linear-gradient(#28a0e5, #015e94);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  visibility: visible;
}

button.stripe-checkout.active {
  background: #005d93;
}

button.stripe-checkout-disabled {
  background: 'rgba(0,0,0,0.2)';
}

button.stripe-checkout span,
button.stripe-checkout-disabled span {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  position: relative;
  padding: 0 12px;
  display: block;
  height: 30px;
  line-height: 30px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

button.stripe-checkout span {
  color: #fff;
  font-weight: bold;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  border-radius: 4px;
}

button.stripe-checkout.active span {
  color: #eee;
  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.1);
  background-image: linear-gradient(#008cdd, #008cdd 85%, #239adf);
}

button.stripe-checkout-disabled span {
  border-radius: 4px;
  color: #999;
  background: #f8f9fa;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
}
</style>
