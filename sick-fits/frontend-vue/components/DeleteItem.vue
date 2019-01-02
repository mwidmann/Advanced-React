<template>
  <button @click="deleteItem">
    <slot></slot>
  </button>
</template>

<script>
import gql from 'graphql-tag'
import { ALL_ITEMS_QUERY } from './Items'

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`

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
        this.$apollo.mutate({
          mutation: DELETE_ITEM_MUTATION,
          variables: {
            id: this.id,
          },
          update(cache, payload) {
            // manually update the cache on the client
            const data = cache.readQuery({ query: ALL_ITEMS_QUERY })
            // filter the deleted items out of the page
            data.items = data.items.filter(
              item => item.id !== payload.data.deleteItem.id
            )
            // put the items back
            cache.writeQuery({ query: ALL_ITEMS_QUERY, data })
          },
        })
      }
    },
  },
}
</script>
