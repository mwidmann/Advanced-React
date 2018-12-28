<template>
  <apollo-query :query="SINGLE_ITEM_QUERY" :variables="{id}">
    <template slot-scope="{result: {loading, error, data}}">
      <p v-if="loading">Loading...</p>
      <error v-else-if="error" :error="error"></error>
      <single-item-styles v-else-if="data">
        <img :src="data.item.largeImage" :alt="data.item.title" />
        <div class="details">
          <h2>Viewing {{data.item.title}}</h2>
          <p>{{data.item.description}}</p>
        </div>
      </single-item-styles>
    </template>
  </apollo-query>
</template>

<script>
import gql from 'graphql-tag'
import styled from 'vue-styled-components'
import theme from '~/assets/theme'
import Error from './ErrorMessage'

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
      price
    }
  }
`

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`

export default {
  components: {
    SingleItemStyles,
    Error
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    SINGLE_ITEM_QUERY() {
      return SINGLE_ITEM_QUERY
    }
  }
}
</script>

<style>

</style>
