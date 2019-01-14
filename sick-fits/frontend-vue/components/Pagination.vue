<template>
  <ApolloQuery
    :query="require('~/graphql/queries/Pagination.gql')"
    @result="setData"
  >
    <template slot-scope="{result: {loading, error, data}}">
      <PaginationStyles v-if="data">
        <nuxt-link
          :to="`/items/${Math.max(page - 1, 1)}`"
          class="prev"
          :aria-disabled="page <= 1"
        >
          ⬅ Prev
        </nuxt-link>
        <p>Page {{ page }} of {{ pages }}</p>
        <p>{{ count }} Items total</p>
        <nuxt-link
          :to="`/items/${Math.min(page + 1, pages)}`"
          class="prev"
          :aria-disabled="page >= pages"
        >
          Next ➡
        </nuxt-link>
      </PaginationStyles>
    </template>
  </ApolloQuery>
</template>

<script>
import PaginationStyles from './styles/PaginationStyles'
import { perPage } from '../config'

export default {
  components: {
    PaginationStyles,
  },
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      count: undefined,
      pages: undefined,
    }
  },
  head() {
    return {
      title: `Sick Vits! - Page ${this.page} of ${this.pages}`,
    }
  },
  methods: {
    setData(data) {
      if (data.data) {
        this.count = data.data.itemsConnection.aggregate.count
        this.pages = Math.ceil(this.count / perPage)
      }
    },
  },
}
</script>
