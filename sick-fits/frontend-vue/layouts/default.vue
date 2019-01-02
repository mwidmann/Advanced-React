<template>
  <StyledPage>
    <Header />
    <Inner>
      <nuxt />
    </Inner>
  </StyledPage>
</template>

<script>
import Vue from 'vue'
import Header from '~/components/Header'
import styled, { injectGlobal } from 'vue-styled-components'
import theme from '~/assets/theme'

const StyledPage = styled.div`
  background: white;
  color: ${theme.black};
`

const Inner = styled.div`
  max-width: ${theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`

injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('/fonts/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  html {
    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next';
  }

  a {
    text-decoration: none;
    color: ${theme.black};
  }
`

export default {
  components: {
    Header,
    StyledPage,
    Inner,
  },
}
</script>
