<template>
  <div>
    <UpdateItem :id="$route.params.id"></UpdateItem>
  </div>
</template>

<script>
import UpdateItem from '../../components/UpdateItem'
export default {
  components: {
    UpdateItem,
  },
}
</script>
