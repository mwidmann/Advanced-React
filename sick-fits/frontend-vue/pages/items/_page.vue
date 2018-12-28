<template>
  <items :page="page"></items>
</template>

<script>
import Items from '~/components/Items'
export default {
  components: {
    Items
  },
  computed: {
    page() {
      return parseFloat(this.$route.params.page) || 1;
    }
  }
}
</script>
