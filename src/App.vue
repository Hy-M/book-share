<template>
  <div id="app">
    <Header />
    <div id="nav">
      <router-link to="/">Browse</router-link>
      {{ "|" }}
      <router-link to="/about">About</router-link>
      {{ "|" }}
      <router-link to="/profile">Profile</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Header
  }
};
</script>
<style>
:root {
  --brown-color: #422a25;
  --pink-color: #d65a85;
  --grey-color: rgb(139, 139, 139);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#nav {
  padding: 0 30px 30px 30px;
  color: var(--brown-color);
}

#nav a {
  font-weight: bold;
  color: var(--brown-color);
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: var(--pink-color);
}
</style>
