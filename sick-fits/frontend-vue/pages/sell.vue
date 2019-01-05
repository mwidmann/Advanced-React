<template>
  <div>
    <PleaseSignIn>
      <CreateItem></CreateItem>
    </PleaseSignIn>
  </div>
</template>

<script>
import CreateItem from '../components/CreateItem'
import PleaseSignIn from '../components/PleaseSignIn'
export default {
  components: {
    CreateItem,
    PleaseSignIn,
  },
}
</script>
