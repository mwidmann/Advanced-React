<template>
  <Columns>
    <signup></signup>
    <signin></signin>
  </Columns>
</template>

<script>
import styled from 'vue-styled-components'
import Signup from '../components/Signup'
import Signin from '../components/Signin'

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`

export default {
  components: {
    Signup,
    Signin,
    Columns
  }
}
</script>
