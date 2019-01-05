<template>
  <tr>
    <td>{{ user.name }}</td>
    <td>{{ user.email }}</td>
    <td
      v-for="permission in possiblePermissions"
      :key="permission"
    >
      <label :for="`${user.id}-permission-${permission}`">
        <input
          v-model="permissions"
          type="checkbox"
          :value="permission"
        >
      </label>
    </td>
    <td>
      <SickButton>Update</SickButton>
    </td>
  </tr>
</template>

<script>
import SickButton from './styles/SickButton'
const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE',
]

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
  },
  mounted() {
    this.permissions = this.user.permissions
  },
}
export { possiblePermissions }
</script>
