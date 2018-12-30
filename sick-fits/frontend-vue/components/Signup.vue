<template>
  <apollo-mutation
    :mutation="SIGNUP_MUTATION"
    :variables="{ name, email, password }"
    @done="onDone"
  >
    <template slot-scope="{ mutate, loading, error }">
      <Form method="post" @submit.native.prevent="mutate">
        <fieldset :disabled="loading" :aria-busy="loading">
          <h2>Sign up for an Account.</h2>
          <Error :error="error"/>
          <label for="email">
            Email
            <input type="email" placeholder="email" name="email" v-model="email">
          </label>
          <label for="name">
            Name
            <input type="text" placeholder="name" name="name" v-model="name">
          </label>
          <label for="password">
            Password
            <input
              type="password"
              placeholder="password"
              name="password"
              v-model="password"
            >
          </label>
          <button type="submit">Sign Up!</button>
        </fieldset>
      </Form>
    </template>
  </apollo-mutation>
</template>

<script>
import { ApolloMutation } from 'vue-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import Error from './ErrorMessage'

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
  components: {
    ApolloMutation,
    Form,
    Error
  },
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    onDone(result) {
      console.log(result)
    }
  },
  computed: {
    SIGNUP_MUTATION() {
      return SIGNUP_MUTATION
    }
  }
}
</script>
