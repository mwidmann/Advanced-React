<template>
  <ApolloMutation
    :mutation="require('~/graphql/mutations/Reset.gql')"
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
export default {
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
  methods: {
    refetchQueries() {
      return [{ query: require('~/graphql/queries/CurrentUser.gql') }]
    },
    onDone() {
      this.password = ''
      this.confirmPassword = ''
    },
  },
}
</script>
