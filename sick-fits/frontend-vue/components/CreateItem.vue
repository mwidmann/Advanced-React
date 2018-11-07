<template>
<div>
  <apollo-mutation
    :mutation="CREATE_ITEM_MUTATION"
    :variables="{ title, price, description }"
    @done="onDone">
    <template slot-scope="{ mutate, loading, error }">
      <Form @submit.native.prevent="mutate">
        <Error :error="error"></Error>
        <fieldset :disabled="loading" :aria-busy="loading">
          <label htmlFor="title">
            Title
            <input type="text" id="title" name="title" placeholder="Title" required v-model="title" />
          </label>

          <label htmlFor="price">
            Price
            <input type="number" id="price" name="price" placeholder="Price" required v-model="price" />
          </label>

          <label htmlFor="description">
            Description
            <textarea type="number" id="description" name="description" placeholder="Enter a description" required v-model="description" />
          </label>

          <button type="submit">Submit</button>
        </fieldset>
      </Form>
    </template>
  </apollo-mutation>
  </div>
</template>

<script>
import { ApolloMutation } from 'vue-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'
import Error from './ErrorMessage'

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`

export default {
  components: {
    Form,
    Error,
    ApolloMutation
  },
  data() {
    return {
      title: 'some title',
      description: 'desc',
      image: '',
      largeImage: '',
      price: 1000
    }
  },
  methods: {
    onDone(result) {
      this.$router.push(`/item/${result.data.createItem.id}`)
    }
  },
  computed: {
    CREATE_ITEM_MUTATION() {
      return CREATE_ITEM_MUTATION
    }
  }
}
</script>
