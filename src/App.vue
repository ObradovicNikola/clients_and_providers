<template>
  <div id="app" class="pb-6">
    <Header class="mb-4" />
    <img alt="Vue logo" src="./assets/logo.png" />
    <Home />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Home from "./components/Home.vue";

export default {
  name: "App",
  components: {
    Header,
    Home,
  },
};
</script>

<style lang="sass">
#app
  text-align: center
</style>
