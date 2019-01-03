<template>
  <ApolloMutation
    :mutation="SIGNUP_MUTATION"
    :refetch-queries="refetchQueries"
    :variables="{ name, email, password }"
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
          <h2>Sign up for an Account.</h2>
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
          <label for="name">
            Name
            <input
              v-model="name"
              type="text"
              placeholder="name"
              name="name"
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
            Sign Up!
          </button>
        </fieldset>
      </Form>
    </template>
  </ApolloMutation>
</template>

<script>
import gql from 'graphql-tag'
import { CURRENT_USER_QUERY } from './User'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(email: $email, password: $password, name: $name) {
      id
      email
      name
    }
  }
`

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
    }
  },
  computed: {
    SIGNUP_MUTATION() {
      return SIGNUP_MUTATION
    },
  },
  methods: {
    refetchQueries() {
      return [{ query: CURRENT_USER_QUERY }]
    },
  },
}
</script>
