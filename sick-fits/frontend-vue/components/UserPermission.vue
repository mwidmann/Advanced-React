<template>
  <ApolloMutation
    :mutation="UPDATE_PERMISSIONS_MUTATION"
    :variables="{permissions, userId: user.id}"
    tag="fragment"
  >
    <template slot-scope="{mutate, error, loading}">
      <tr v-if="error">
        <td :colspan="3 + possiblePermissions.length">
          <Error :error="error" />
        </td>
      </tr>
      <tr>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td
          v-for="permission in possiblePermissions"
          :key="permission"
        >
          <label :for="`${user.id}-permission-${permission}`">
            <input
              :id="`${user.id}-permission-${permission}`"
              v-model="permissions"
              type="checkbox"
              :value="permission"
            >
          </label>
        </td>
        <td>
          <SickButton
            :disabled="loading"
            type="button"
            @click="mutate"
          >
            Update
          </SickButton>
        </td>
      </tr>
    </template>
  </ApolloMutation>
</template>

<script>
import gql from 'graphql-tag'
import SickButton from './styles/SickButton'
const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE',
]

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION(
    $permissions: [Permission]
    $userId: ID!
  ) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      email
      name
      permissions
    }
  }
`

export default {
  components: {
    SickButton,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      permissions: [],
    }
  },
  computed: {
    possiblePermissions() {
      return possiblePermissions
    },
    UPDATE_PERMISSIONS_MUTATION() {
      return UPDATE_PERMISSIONS_MUTATION
    },
  },
  mounted() {
    this.permissions = this.user.permissions
  },
}
export { possiblePermissions }
</script>
