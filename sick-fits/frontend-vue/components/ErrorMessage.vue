<template>
  <div v-if="error && error.message">
    <ErrorStyles v-for="(e, i) in errors" :key="i">
       <p data-test="graphql-error">
          <strong>Shoot!</strong>
          {{e.message.replace('GraphQL error: ', '')}}
        </p>
    </ErrorStyles>
  </div>
</template>
<script>
import styled from 'vue-styled-components'
const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`

export default {
  components: {
    ErrorStyles
  },
  props: {
    error: {
      type: [Object,Error],
      default: undefined
    }
  },
  computed: {
    errors() {
      if (
        this.error.networkError &&
        this.error.networkError.result &&
        this.error.networkError.result.errors.length
      ) {
        return this.error.networkError.result.errors
      }
      return [this.error]
    }
  }
}
</script>
