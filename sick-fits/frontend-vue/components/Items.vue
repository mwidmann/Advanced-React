<template>
  <Center>
    <apollo-query :query="ALL_ITEMS_QUERY">
      <template slot-scope="{result: {loading, error, data}}">
        <p v-if="loading">Loading...</p>
        <p v-else-if="error">Error: {error.message}</p>
        <items-list v-else-if="data">
          <item :item="item"  v-for="item in data.items" :key="item.id" />
        </items-list>
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </apollo-query>
  </Center>
</template>

<script>
import { ApolloQuery } from 'vue-apollo'
import gql from 'graphql-tag'
import styled from 'vue-styled-components'
import theme from '~/assets/theme'
import Item from '~/components/Item'

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
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
    ApolloQuery
  },
  computed: {
    ALL_ITEMS_QUERY() {
      return ALL_ITEMS_QUERY
    }
  }
}
</script>
