<template>
  <Center>
    <pagination :page="page"></pagination>
    <apollo-query :query="ALL_ITEMS_QUERY" :variables="{ skip: startAt }" fetchPolicy="cache-and-network">
      <template slot-scope="{result: {loading, error, data}}">
        <p v-if="loading">Loading...</p>
        <error v-else-if="error" :error="error"></error>
        <items-list v-else-if="data">
          <item :item="item"  v-for="item in data.items" :key="item.id" />
        </items-list>
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </apollo-query>
    <pagination :page="page"></pagination>
  </Center>
</template>

<script>
import { ApolloQuery } from 'vue-apollo'
import gql from 'graphql-tag'
import styled from 'vue-styled-components'
import theme from '~/assets/theme'
import Item from '~/components/Item'
import Error from '~/components/ErrorMessage'
import Pagination from '~/components/Pagination'
import { perPage } from '../config'

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage} ) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`

const Center = styled.div`
  text-align: center;
`

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${theme.maxWidth};
  margin: 0 auto;
`

export default {
  components: {
    Center,
    ItemsList,
    Item,
    ApolloQuery,
    Error,
    Pagination
  },
  props: {
    page: {
      type: Number,
      required: true
    },
  },
  computed: {
    ALL_ITEMS_QUERY() {
      return ALL_ITEMS_QUERY
    },
    startAt() {
      return this.page * perPage - perPage
    }
  }
}
</script>
