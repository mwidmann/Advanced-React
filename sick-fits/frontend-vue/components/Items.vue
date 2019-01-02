<template>
  <Center>
    <Pagination :page="page"></Pagination>
    <ApolloQuery
      :query="ALL_ITEMS_QUERY"
      :variables="{ skip: startAt }"
      fetch-policy="cache-and-network"
    >
      <template slot-scope="{result: {loading, error, data}}">
        <p v-if="loading">
          Loading...
        </p>
        <Error
          v-else-if="error"
          :error="error"
        ></Error>
        <ItemsList v-else-if="data">
          <Item
            v-for="item in data.items"
            :key="item.id"
            :item="item"
          />
        </ItemsList>
        <div
          v-else
          class="no-result apollo"
        >
          No result :(
        </div>
      </template>
    </ApolloQuery>
    <Pagination :page="page"></Pagination>
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
    Pagination,
  },
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ALL_ITEMS_QUERY() {
      return ALL_ITEMS_QUERY
    },
    startAt() {
      return this.page * perPage - perPage
    },
  },
}
</script>
