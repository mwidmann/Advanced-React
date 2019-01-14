<template>
  <ApolloMutation
    :mutation="require('~/graphql/mutations/RequestReset.gql')"
    :variables="{ email }"
    @done="email = ''; called = true"
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
          <h2>Request a password reset</h2>
          <Error :error="error" />
          <p v-if="!error && !loading && called">
            Success! Check your email for a reset link.
          </p>
          <label for="email">
            Email
            <input
              v-model="email"
              type="email"
              placeholder="email"
              name="email"
            >
          </label>
          <button type="submit">
            Request Reset!
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
      called: false,
    }
  },
}
</script>
