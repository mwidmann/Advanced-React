<template>
  <div>
    <PleaseSignIn>
      <Permissions></Permissions>
    </PleaseSignIn>
  </div>
</template>

<script>
import Permissions from '../components/Permissions'
import PleaseSignIn from '../components/PleaseSignIn'
export default {
  components: {
    Permissions,
    PleaseSignIn,
  },
}
</script>
