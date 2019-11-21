<template>
  <Center>
    <Pagination :page="page"></Pagination>
    <ApolloQuery
      :query="require('~/graphql/queries/AllItems.gql')"
      :variables="{ skip: startAt, first: perPage }"
      fetch-policy="cache-and-network"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <p v-if="loading">
          Loading...
        </p>
        <Error v-else-if="error" :error="error"></Error>
        <ItemsList v-else-if="data">
          <Item v-for="item in data.items" :key="item.id" :item="item" />
        </ItemsList>
        <div v-else class="no-result apollo">
          No result :(
        </div>
      </template>
    </ApolloQuery>
    <Pagination :page="page"></Pagination>
  </Center>
</template>

<script>
import { ApolloQuery } from 'vue-apollo'
import styled from 'vue-styled-components'
import { perPage } from '../config'
import theme from '~/assets/theme'
import Item from '~/components/Item'
import Pagination from '~/components/Pagination'

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
  data() {
    return {
      perPage,
    }
  },
  computed: {
    startAt() {
      return this.page * perPage - perPage
    },
  },
}
</script>
