// src/components/App.vue
<template>
  <div id="app">
    <Header />
    <div id="nav">
      <router-link tag="p" to="/">
        <a>Browse</a>
      </router-link>
      <router-link tag="p" to="/about">
        <a>About</a>
      </router-link>
      <router-link tag="p" to="/profile">
        <a>Profile</a>
      </router-link>
      <router-link tag="p" to="/auth" v-if="!signedIn">
        <a>Sign up/in</a>
      </router-link>
    </div>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import { AmplifyEventBus } from "aws-amplify-vue";
import { Auth } from "aws-amplify";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "app",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      signedIn: false
    };
  },
  beforeCreate() {
    AmplifyEventBus.$on("authState", info => {
      if (info === "signedIn") {
        this.signedIn = true;
        this.$router.push("Profile").catch(err => {});
      }
      if (info === "signedOut") {
        this.$router.push("/").catch(err => {});
        this.signedIn = false;
      }
    });

    Auth.currentAuthenticatedUser()
      .then(user => {
        this.signedIn = true;
      })
      .catch(() => (this.signedIn = false));
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

.main {
  width: 95%;
  margin: 0 auto;
}

.btn {
  border-radius: 8px;
  padding: 10px 0;
  width: 50%;
  background-color: transparent;
  border: 1px solid var(--pink-color);
  box-shadow: 1px 1px 3px var(--grey-color);
  outline-color: var(--pink-color);
  font-size: 1rem;
  margin: 0.5rem 0;
}

.h3 {
  color: var(--brown-color);
  line-height: 1.7rem;
  font-size: 1.6rem;
}

.h4 {
  color: var(--brown-color);
}

.input {
  padding: 15px;
  border-radius: 8px;
  box-shadow: none;
  text-shadow: none;
  width: 95%;
  outline-color: var(--pink-color);
  margin: 0.5rem 0;
  font-size: 1rem;
}

.form {
  height: 80px;
  width: 100%;
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
  padding: 0 20px;
  color: var(--brown-color);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

#nav a {
  font-weight: bold;
  color: var(--brown-color);
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: var(--pink-color);
}

@media (min-width: 425px) {
  #nav a {
    font-size: 1.1rem;
  }

  .imgLarge {
    height: 300px;
    width: 250px;
  }
}

@media (min-width: 768px) {
  .main {
    width: 75%;
  }

  .h3 {
    margin: 3rem 0;
  }
}

@media (min-width: 1024px) {
  .main {
    width: 60%;
  }

  #nav {
    justify-content: center;
  }

  #nav a {
    margin: 0 1rem;
    font-size: 1.3rem;
  }

  .input {
    font-size: 1.1rem;
    padding: 20px;
    width: 80%;
  }

  .btn {
    font-size: 1.1rem;
    padding: 15px;
    width: 35%;
    margin: 1rem 0;
  }

  .imgPreview {
    height: 300px;
    width: 250px;
  }

  .imgLarge {
    height: 400px;
    width: 350px;
  }
}
</style>
