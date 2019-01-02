<template>
  <div class="container">
    <div>
      <h1>{{ error.statusCode }}</h1>
      <div class="message">
        <h2 v-if="error.statusCode === 404">
          This page could not be found
        </h2>
        <h2 v-else>
          An error occurred
        </h2>
      </div>
    </div>
    <!-- <nuxt-link to="/">Home page</nuxt-link> -->
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: [Object, Array],
      required: true,
    },
  },
  head() {
    return {
      title:
        this.error.statusCode === 404
          ? `${this.error.statusCode}: This page could not be found`
          : `Error ${this.error.statusCode} occurred`,
    }
  },
  layout: 'default', // you can set a custom layout for the error page
}
</script>

<style scoped>
.container {
  font-family: -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI',
    'Fira Sans', Avenir, 'Helvetica Neue', 'Lucida Grande', sans-serif;
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h1 {
  display: inline-block;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  margin: 0;
  margin-right: 20px;
  padding: 10px 23px 10px 0;
  font-size: 24px;
  font-weight: 500;
  vertical-align: top;
}
.message {
  display: inline-block;
  text-align: left;
  line-height: 49px;
  height: 49px;
  vertical-align: middle;
}
h2 {
  font-size: 14px;
  font-weight: normal;
  line-height: inherit;
  margin: 0;
  padding: 0;
}
</style>
