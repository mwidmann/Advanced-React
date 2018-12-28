<template>
  <div>
    <apollo-query :query="SINGLE_ITEM_QUERY" :variables="{id}">
      <template slot-scope="{result: {loading, error, data}}">
        <p v-if="loading">Loading...</p>
        <p v-else-if="error">Error: {error.message}</p>
        <Form v-else-if="data" @submit.native.prevent="mutateData">
          <Error :error="error"></Error>
          <fieldset :disabled="loading" :aria-busy="loading">
            <label for="title">
              Title
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                required
                :value="data.item.title"
                @input="handleChange"
              >
            </label>

            <label for="price">
              Price
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                required
                :value="data.item.price"
                @input="handleChange"
              >
            </label>

            <label for="description">
              Description
              <textarea
                type="number"
                id="description"
                name="description"
                placeholder="Enter a description"
                required
                :value="data.item.description"
                @input="handleChange"
              />
            </label>

            <button type="submit">Submit</button>
          </fieldset>
        </Form>
      </template>
    </apollo-query>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'
import Error from './ErrorMessage'

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`

export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`

export default {
  components: {
    Form,
    Error,
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      updateData: {}
    }
  },
  methods: {
    handleChange(e) {
      const { name, type, value } = e.target
      const val = type === 'number' ? parseFloat(value) : value
      this.updateData[name] = val
    },
    async mutateData() {
      const res = await this.$apollo.mutate({
        mutation: this.UPDATE_ITEM_MUTATION,
        variables: {
          id: this.id,
          ...this.updateData
        }
      })
      this.$router.push(`/item/${res.data.updateItem.id}`)
    }
  },
  computed: {
    UPDATE_ITEM_MUTATION() {
      return UPDATE_ITEM_MUTATION
    },
    SINGLE_ITEM_QUERY() {
      return SINGLE_ITEM_QUERY
    },
  }
}
</script>
