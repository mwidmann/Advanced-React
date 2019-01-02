<template>
  <SingleItem :id="$route.params.id"></SingleItem>
</template>

<script>
import SingleItem from '~/components/SingleItem'
export default {
  components: {
    SingleItem,
  },
}
</script>
