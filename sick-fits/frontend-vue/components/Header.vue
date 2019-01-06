<template>
  <StyledHeader>
    <div class="bar">
      <Logo>
        <nuxt-link to="/">
          Sick Vits
        </nuxt-link>
      </Logo>
      <Nav></Nav>
    </div>
    <div class="sub-bar">
      <p>Search</p>
    </div>
    <div>Cart</div>
  </StyledHeader>
</template>

<script>
import styled from 'vue-styled-components'
import Nav from '~/components/Nav'
import theme from '~/assets/theme'

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: ${theme.red};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${theme.black};
    display: grid;
    justify-content: space-between;
    grid-template-columns: auto 1fr;
    align-items: stretch;

    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-contnet: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${theme.lightgrey};
  }
`

export default {
  components: {
    Nav,
    StyledHeader,
    Logo,
  },
}
</script>
