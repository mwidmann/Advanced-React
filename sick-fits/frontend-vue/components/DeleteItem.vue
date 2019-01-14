<template>
  <button @click="deleteItem">
    <slot></slot>
  </button>
</template>

<script>
import { perPage } from '~/config'

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    deleteItem() {
      if (confirm('Are you sure?')) {
        this.$apollo
          .mutate({
            mutation: require('~/graphql/mutations/DeleteItem.gql'),
            variables: {
              id: this.id,
            },
            update(cache, payload) {
              // manually update the cache on the client
              const data = cache.readQuery({
                query: require('~/graphql/queries/AllItems.gql'),
                variables: { first: perPage },
              })
              // filter the deleted items out of the page
              data.items = data.items.filter(
                item => item.id !== payload.data.deleteItem.id
              )
              // put the items back
              cache.writeQuery({
                query: require('~/graphql/queries/AllItems.gql'),
                data,
              })
            },
          })
          .catch(err => alert(err.message))
      }
    },
  },
}
</script>
