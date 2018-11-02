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
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v14/S6u9w4BMUTPHh6UVSwiPGQ.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'radnika_next';
    src: url('/assets/radnikanext-medium-webfont.woff2') format('woff2');
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
    Inner
  }
}
</script>
