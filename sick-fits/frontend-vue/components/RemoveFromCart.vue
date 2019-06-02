<template>
  <ApolloMutation
    :mutation="require('~/graphql/mutations/RemoveFromCart.gql')"
    tag=""
    :variables="{id}"
  >
    <BigButton
      slot-scope="{ mutate, loading }"
      :disabled="loading"
      title="Delete Item"
      @click="mutate"
    >
      &times;
    </BigButton>
  </ApolloMutation>
</template>

<script>
import styled from 'vue-styled-components'
import theme from '~/assets/theme'

const BigButton = styled.button`
  font-style: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${theme.red};
    cursor: pointer;
  }
`

export default {
  components: {
    BigButton,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
</style>
