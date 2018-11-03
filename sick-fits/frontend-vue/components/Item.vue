<template>
  <item-styles>
    <img v-if="item.src" :src="item.src" :alt="item.title" />
    <Title>
      <nuxt-link :to="`/item/${item.id}`">{{item.title}}</nuxt-link>
    </Title>
    <price-tag>{{formattedPrice}}</price-tag>
    <p>{{item.description}}</p>
      <div class="buttonList">
        <nuxt-link :to="`/update/${item.id}`">Edit ✏</nuxt-link>
        <button>Add To Cart</button>
        <button>Delete</button>
      </div>
  </item-styles>
</template>

<script>
import Title from './styles/Title'
import ItemStyles from './styles/ItemStyles'
import PriceTag from './styles/PriceTag'
import formatMoney from '~/lib/formatMoney'

export default {
  components: {
    Title,
    ItemStyles,
    PriceTag
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedPrice() {
      return formatMoney(this.item.price)
    }
  }
}
</script>
