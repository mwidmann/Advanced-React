<template>
  <fragment>
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
  </fragment>
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
      error: undefined,
      loading: undefined,
    }
  },
  computed: {
    possiblePermissions() {
      return possiblePermissions
    },
  },
  mounted() {
    this.permissions = this.user.permissions
  },
  methods: {
    async mutate() {
      this.error = undefined
      this.loading = true
      try {
        await this.$apollo.mutate({
          mutation: UPDATE_PERMISSIONS_MUTATION,
          variables: {
            permissions: this.permissions,
            userId: this.user.id,
          },
        })
      } catch (e) {
        this.error = e
      }
      this.loading = false
    },
  },
}
export { possiblePermissions }
</script>
