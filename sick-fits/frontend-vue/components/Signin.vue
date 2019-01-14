<template>
  <ApolloMutation
    :mutation="require('~/graphql/mutations/Signin.gql')"
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
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    refetchQueries() {
      return [{ query: require('~/graphql/queries/CurrentUser.gql') }]
    },
  },
}
</script>
