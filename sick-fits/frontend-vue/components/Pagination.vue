<template>
  <apollo-query :query="PAGINATION_QUERY" @result="setData">
    <template slot-scope="{result: {loading, error, data}}">
      <PaginationStyles v-if="data">
        <nuxt-link
          :to="`/items/${Math.max(page - 1, 1)}`"
          class="prev"
          :aria-disabled="page <= 1">⬅ Prev</nuxt-link>
        <p>Page {{page}} of {{pages}}</p>
        <p>{{count}} Items total</p>
        <nuxt-link
          :to="`/items/${Math.min(page + 1, pages)}`"
          class="prev"
          :aria-disabled="page >= pages">Next ➡</nuxt-link>
      </PaginationStyles>
    </template>
  </apollo-query>
</template>

<script>
import gql from 'graphql-tag'
import PaginationStyles from './styles/PaginationStyles'
import { perPage } from '../config'

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`

export default {
  components: {
    PaginationStyles
  },
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      count: undefined,
      pages: undefined
    }
  },
  computed: {
    PAGINATION_QUERY() {
      return PAGINATION_QUERY
    }
  },
  head() {
    return {
      title: `Sick Fits! - Page ${this.page} of ${this.pages}`
    }
  },
  methods: {
    setData(data) {
      if (data.data) {
        this.count = data.data.itemsConnection.aggregate.count
        this.pages = Math.ceil(this.count / perPage)
      }
    }
  }
}
</script>
