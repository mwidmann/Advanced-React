<template>
  <div>
    <update-item :id="$route.params.id"></update-item>
  </div>
</template>

<script>
import UpdateItem from '../../components/UpdateItem'
export default {
  components: {
    UpdateItem
  }
}
</script>
