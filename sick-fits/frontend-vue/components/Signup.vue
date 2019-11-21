<template>
  <ApolloMutation
    :mutation="require('~/graphql/mutations/Signup.gql')"
    :refetch-queries="refetchQueries"
    :variables="{ name, email, password }"
  >
    <template slot-scope="{ mutate, loading, error }">
      <Form method="post" @submit.native.prevent="mutate">
        <fieldset :disabled="loading" :aria-busy="loading">
          <h2>Sign up for an Account.</h2>
          <Error :error="error" />
          <label for="email">
            Email
            <input
              v-model="email"
              type="email"
              placeholder="email"
              name="email"
            />
          </label>
          <label for="name">
            Name
            <input v-model="name" type="text" placeholder="name" name="name" />
          </label>
          <label for="password">
            Password
            <input
              v-model="password"
              type="password"
              placeholder="password"
              name="password"
            />
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
export default {
  data() {
    return {
      name: '',
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
