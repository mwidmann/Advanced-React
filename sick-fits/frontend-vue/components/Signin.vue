<template>
  <ApolloMutation
    :mutation="SIGNIN_MUTATION"
    :refetch-queries="refetchQueries"
    :variables="{ email, password }"
  >
    <template slot-scope="{ mutate, loading, error }">
      <Form
        method="post"
        @submit.native.prevent="mutate"
      >
        <fieldset
          :disabled="loading"
          :aria-busy="loading"
        >
          <h2>Sign into your account</h2>
          <Error :error="error" />
          <label for="email">
            Email
            <input
              v-model="email"
              type="email"
              placeholder="email"
              name="email"
            >
          </label>
          <label for="password">
            Password
            <input
              v-model="password"
              type="password"
              placeholder="password"
              name="password"
            >
          </label>
          <button type="submit">
            Sign In!
          </button>
        </fieldset>
      </Form>
    </template>
  </ApolloMutation>
</template>

<script>
import { ApolloMutation } from 'vue-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`

export default {
  components: {
    ApolloMutation,
    Form,
    Error,
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    SIGNIN_MUTATION() {
      return SIGNIN_MUTATION
    },
  },
  methods: {
    refetchQueries() {
      return [{ query: CURRENT_USER_QUERY }]
    },
  },
}
</script>
