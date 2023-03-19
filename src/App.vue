<template>
  <div id="app">
    <h1>My posts</h1>
    <MyPosts />
  </div>
</template>

<script>
import MyPosts from "./components/MyPosts.vue";

export default {
  name: "App",
  components: {
    MyPosts,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
