<template>
  <div>
    <ApolloMutation
      :mutation="CREATE_ITEM_MUTATION"
      :variables="{ title, price, description, image, largeImage }"
      @done="onDone"
    >
      <template slot-scope="{ mutate, loading, error }">
        <Form @submit.native.prevent="mutate">
          <Error :error="error"></Error>
          <fieldset
            :disabled="loading"
            :aria-busy="loading"
          >
            <label for="file">
              Image
              <input
                id="file"
                type="file"
                name="file"
                placeholder="Upload an image"
                @change="uploadFile"
              >
            </label>
            <img
              v-if="image"
              width="200"
              alt="Upload Preview"
              :src="image"
            >

            <label for="title">
              Title
              <input
                id="title"
                v-model="title"
                type="text"
                name="title"
                placeholder="Title"
                required
              >
            </label>

            <label for="price">
              Price
              <input
                id="price"
                v-model="price"
                type="number"
                name="price"
                placeholder="Price"
                required
              >
            </label>

            <label for="description">
              Description
              <textarea
                id="description"
                v-model="description"
                type="number"
                name="description"
                placeholder="Enter a description"
                required
              />
            </label>

            <button type="submit">
              Submit
            </button>
          </fieldset>
        </Form>
      </template>
    </ApolloMutation>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import formatMoney from '../lib/formatMoney'

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
  data() {
    return {
      title: '',
      description: '',
      image: '',
      largeImage: '',
      price: 0,
    }
  },
  computed: {
    CREATE_ITEM_MUTATION() {
      return CREATE_ITEM_MUTATION
    },
  },
  methods: {
    onDone(result) {
      this.$router.push(`/item/${result.data.createItem.id}`)
    },
    async uploadFile(e) {
      const files = e.target.files
      const data = new FormData()
      data.append('file', files[0])
      data.append('upload_preset', 'sickfits')

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dm9gla83n/image/upload',
        {
          method: 'POST',
          body: data,
        }
      )
      const file = await res.json()
      this.image = file.secure_url
      this.largeImage = file.eager[0].secure_url
    },
  },
}
</script>
