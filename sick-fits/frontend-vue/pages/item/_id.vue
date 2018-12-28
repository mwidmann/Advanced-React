<template>
  <single-item :id="$route.params.id"></single-item>
</template>

<script>
import SingleItem from '~/components/SingleItem'
export default {
  components: {
    SingleItem
  }
}
</script>
