<template>
  <ApolloQuery
    :query="require('~/graphql/queries/SingleItem.gql')"
    :variables="{ id }"
  >
    <template slot-scope="{ result: { loading, error, data } }">
      <p v-if="loading">
        Loading...
      </p>
      <Error v-else-if="error" :error="error"></Error>
      <SingleItemStyles v-else-if="data">
        <img :src="data.item.largeImage" :alt="data.item.title" />
        <div class="details">
          <h2>Viewing {{ data.item.title }}</h2>
          <p>{{ data.item.description }}</p>
        </div>
      </SingleItemStyles>
    </template>
  </ApolloQuery>
</template>

<script>
import styled from 'vue-styled-components'
import theme from '~/assets/theme'

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
    Error,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
}
</script>
