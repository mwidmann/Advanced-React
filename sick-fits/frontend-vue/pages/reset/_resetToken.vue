<template>
  <div>
    <Reset :reset-token="$route.params.resetToken"></Reset>
  </div>
</template>

<script>
import Reset from '../../components/Reset'
export default {
  components: {
    Reset,
  },
}
</script>
