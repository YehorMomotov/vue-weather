<template>
  <div id="app">
    <mainWrapperVue />
  </div>
</template>

<script>
import mainWrapperVue from "./components/main-wrapper.vue";

export default {
  name: "App",
  components: { mainWrapperVue },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400&family=Overpass:wght@100;200;300;400&display=swap");

#app {
  color: white;
  font-family: "Inter", sans-serif;
  font-style: normal;
  text-shadow: -1.51px 2.26px 0.75px rgba(0, 0, 0, 0.1);
  height: 100%;
}
body,
html {
  margin: 0;
  height: 100%;
  width: 100%;
}
h1 {
  font-weight: 300;
}
</style>
