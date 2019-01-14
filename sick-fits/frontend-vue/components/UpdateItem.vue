<template>
  <div>
    <ApolloQuery
      :query="require('~/graphql/queries/SingleItem')"
      :variables="{id}"
    >
      <template slot-scope="{result: {loading, error, data}}">
        <p v-if="loading">
          Loading...
        </p>
        <p v-else-if="error">
          Error: {error.message}
        </p>
        <Form
          v-else-if="data"
          @submit.native.prevent="mutateData"
        >
          <Error :error="error"></Error>
          <fieldset
            :disabled="loading"
            :aria-busy="loading"
          >
            <label for="title">
              Title
              <input
                id="title"
                type="text"
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
                id="price"
                type="number"
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
                id="description"
                type="number"
                name="description"
                placeholder="Enter a description"
                required
                :value="data.item.description"
                @input="handleChange"
              />
            </label>

            <button type="submit">
              Submit
            </button>
          </fieldset>
        </Form>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import formatMoney from '../lib/formatMoney'

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      updateData: {},
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
        mutation: require('~/graphql/mutations/UpdateItem.gql'),
        variables: {
          id: this.id,
          ...this.updateData,
        },
      })
      this.$router.push(`/item/${res.data.updateItem.id}`)
    },
  },
}
</script>
