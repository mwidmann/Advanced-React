<template>
  <ApolloQuery :query="ALL_USERS_QUERY">
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
import gql from 'graphql-tag'
import Table from './styles/Table'
import UserPermission, { possiblePermissions } from './UserPermission'

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      email
      name
      permissions
    }
  }
`

export default {
  components: {
    Table,
    UserPermission,
  },
  computed: {
    ALL_USERS_QUERY() {
      return ALL_USERS_QUERY
    },
    possiblePermissions() {
      return possiblePermissions
    },
  },
}
export { ALL_USERS_QUERY }
</script>
