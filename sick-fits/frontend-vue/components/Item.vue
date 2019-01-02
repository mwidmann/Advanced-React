<template>
  <ItemStyles>
    <img
      v-if="item.image"
      :src="item.image"
      :alt="item.title"
    />
    <Title>
      <nuxt-link :to="`/item/${item.id}`">{{ item.title }}</nuxt-link>
    </Title>
    <PriceTag>{{ formattedPrice }}</PriceTag>
    <p>{{ item.description }}</p>
    <div class="buttonList">
      <nuxt-link :to="`/update/${item.id}`">
        Edit ✏
      </nuxt-link>
      <button>Add To Cart</button>
      <DeleteItem :id="item.id">
        Delete
      </DeleteItem>
    </div>
  </ItemStyles>
</template>

<script>
import Title from './styles/Title'
import ItemStyles from './styles/ItemStyles'
import PriceTag from './styles/PriceTag'
import formatMoney from '~/lib/formatMoney'
import DeleteItem from './DeleteItem'

export default {
  components: {
    Title,
    ItemStyles,
    PriceTag,
    DeleteItem,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedPrice() {
      return formatMoney(this.item.price)
    },
  },
}
</script>
