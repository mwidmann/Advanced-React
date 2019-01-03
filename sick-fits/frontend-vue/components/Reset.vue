<template>
  <ApolloMutation
    :mutation="RESET_MUTATION"
    :variables="{ resetToken, password, confirmPassword }"
    :refetch-queries="refetchQueries"
    @done="onDone"
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
          <h2>Reset your password</h2>
          <Error :error="error" />
          <label for="password">
            Your new Password
            <input
              v-model="password"
              type="password"
              placeholder="password"
              name="password"
            >
          </label>
          <label for="confirmPassword">
            Confirm your Password
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm your Password"
              name="confirmPassword"
            >
          </label>
          <button type="submit">
            Reset your Password!
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

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`

export default {
  components: {
    Form,
    Error,
  },
  props: {
    resetToken: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      password: '',
      confirmPassword: '',
    }
  },
  computed: {
    RESET_MUTATION() {
      return RESET_MUTATION
    },
  },
  methods: {
    refetchQueries() {
      return [{ query: CURRENT_USER_QUERY }]
    },
    onDone() {
      this.password = ''
      this.confirmPassword = ''
    },
  },
}
</script>
