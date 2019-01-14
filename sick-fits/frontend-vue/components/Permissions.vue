<template>
  <ApolloQuery :query="require('~/graphql/queries/AllUsers.gql')">
    <div slot-scope="{ result: { data, error } }">
      <Error :error="error" />
      <div v-if="data">
        <h2>Manage Permissions</h2>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th
                v-for="permission in possiblePermissions"
                :key="permission"
              >
                {{ permission }}
              </th>
              <th>👇</th>
            </tr>
          </thead>
          <tbody>
            <UserPermission
              v-for="user in data.users"
              :key="user.id"
              :user="user"
            ></UserPermission>
          </tbody>
        </Table>
      </div>
    </div>
  </ApolloQuery>
</template>

<script>
import Table from './styles/Table'
import UserPermission, { possiblePermissions } from './UserPermission'

export default {
  components: {
    Table,
    UserPermission,
  },
  computed: {
    possiblePermissions() {
      return possiblePermissions
    },
  },
}
</script>
