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
      <router-link tag="p" to="/protected">
        <a>Protected</a>
      </router-link>
      <router-link tag="p" to="/auth" v-if="!signedIn">
        <a>Sign Up / Sign In</a>
      </router-link>
    </div>
    <router-view></router-view>
    <div class="sign-out">
      <!-- <amplify-sign-out v-if="signedIn"></amplify-sign-out> -->
      <!--if user is signed in, it will render out a sign out page-->
    </div>
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
<!--Displays the navigation links, renders the router and authentication logic for signing and signing out -->

<script>
import { AmplifyEventBus } from "aws-amplify-vue";
import { Auth } from "aws-amplify";
<<<<<<< HEAD
import Header from "./components/Header";
=======
import Header from "@/components/Header.vue";
>>>>>>> e9b8de3c621bb2d2733ce580b6e49783ecd9b7f3

export default {
  name: "app",
  components: {
    Header,
  },
  data() {
    return {
      signedIn: false,
    };
  },
  //beforeCreate is a lifecycle  which will listen to the authState event by using AmplifyEventBus
  //if signed in they can view their profile and set signed in to true or if not then redirected to auth so they can sign in
  beforeCreate() {
    AmplifyEventBus.$on("authState", (info) => {
      if (info === "signedIn") {
        this.signedIn = true;
        this.$router.push("/profile").catch((err) => {});
      }
      if (info === "signedOut") {
        this.$router.push("/").catch((err) => {});
        this.signedIn = false;
      }
    });

    //when app loads we also call auth.currentauthenticated user to check whether or not the user has signed in and set it to true

    Auth.currentAuthenticatedUser()
      .then((user) => {
        this.signedIn = true;
      })
      .catch(() => (this.signedIn = false));
  },
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
