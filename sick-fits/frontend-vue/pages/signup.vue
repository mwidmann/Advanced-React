<template>
  <Columns>
    <Signin></Signin>
    <Signup></Signup>
    <RequestReset></RequestReset>
  </Columns>
</template>

<script>
import styled from 'vue-styled-components'
import Signup from '../components/Signup'
import Signin from '../components/Signin'
import RequestReset from '../components/RequestReset'

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`

export default {
  components: {
    Columns,
    Signup,
    Signin,
    RequestReset,
  },
}
</script>
