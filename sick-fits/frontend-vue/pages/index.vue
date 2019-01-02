<template>
  <div>
    <Items :page="parseFloat(1)" />
  </div>
</template>

<script>
import Items from '~/components/Items'

export default {
  components: {
    Items,
  },
}
</script>
