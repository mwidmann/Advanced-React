<template>
<div>
  <apollo-mutation
    :mutation="CREATE_ITEM_MUTATION"
    :variables="{ title, price, description, image, largeImage }"
    @done="onDone">
    <template slot-scope="{ mutate, loading, error }">
      <Form @submit.native.prevent="mutate">
        <Error :error="error"></Error>
        <fieldset :disabled="loading" :aria-busy="loading">
          <label for="file">
            Image
            <input type="file" id="file" name="file" placeholder="Upload an image" @change="uploadFile" />
          </label>
          <img width="200" v-if="image" alt="Upload Preview" :src="image"/>

          <label for="title">
            Title
            <input type="text" id="title" name="title" placeholder="Title" required v-model="title" />
          </label>

          <label for="price">
            Price
            <input type="number" id="price" name="price" placeholder="Price" required v-model="price" />
          </label>

          <label for="description">
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
          body: data
        }
      )
      const file = await res.json()
      this.image = file.secure_url
      this.largeImage = file.eager[0].secure_url
    }
  },
  computed: {
    CREATE_ITEM_MUTATION() {
      return CREATE_ITEM_MUTATION
    }
  }
}
</script>
