<template>
  <StyledPage>
    <Header/>
    <inner>
      <nuxt/>
    </inner>
  </StyledPage>
</template>

<script>
import Vue from 'vue'
import Header from '~/components/Header'
import styled, { injectGlobal } from 'vue-styled-components'

const StyledPage = styled.div`
  background: white;
  color: black;
`
  // background: ${this.theme.red};

console.log(Vue.prototype, this)

const Inner = styled.div`
  max-width: ${Vue.prototype.$theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`

export default {
  components: {
    Header,
    StyledPage,
    Inner,
  },
  mounted() {
    console.log(this.$theme);
  }
}
</script>


<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
