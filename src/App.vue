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

/* make all router-links cursor: pointer */
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

.main {
  width: 95%;
  margin: 0 auto;
}
.btn {
  border-radius: 8px;
  padding: 4px 0;
  width: 50%;
  background-color: transparent;
  border: 1px solid var(--pink-color);
  box-shadow: 1px 1px 3px var(--grey-color);
  outline-color: var(--pink-color);
}

.h3 {
  color: var(--brown-color);
  line-height: 1.7rem;
}

.h4 {
  color: var(--brown-color);
}

.input {
  padding: 10px;
  border-radius: 8px;
  box-shadow: none;
  text-shadow: none;
  width: 95%;
  outline-color: var(--pink-color);
}

.form {
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.imgPreview {
  height: 250px;
  width: 200px;
  border-radius: 8px;
}
.imgLarge {
  height: 250px;
  width: 250px;
  border-radius: 8px;
}

#nav {
  margin-bottom: 2rem;
  padding: 0 30px;
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
