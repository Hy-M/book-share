// src/components/App.vue
<template>
  <div id="app">
    <div class="nav">
      <router-link tag="p" to="/">
        <a>Home</a>
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
      <amplify-sign-out v-if="signedIn"></amplify-sign-out>
      <!--if user is signed in, it will render out a sign out page-->
    </div>
  </div>
</template>
<!--Displays the navigation links, renders the router and authentication logic for signing and signing out -->

<script>
import { AmplifyEventBus } from "aws-amplify-vue";
import { Auth } from "aws-amplify";

export default {
  name: "app",
  data() {
    return {
      signedIn: false,
    };
  },
  //beforeCreate is a lifecycle page which will listen to the authState event by using AmplifyEventBus
  //if signed in they can view their profile and set signed in to true or if not then redirected to auth so they can sign in
  beforeCreate() {
    AmplifyEventBus.$on("authState", (info) => {
      if (info === "signedIn") {
        this.signedIn = true;
        this.$router.push("/profile");
      }
      if (info === "signedOut") {
        this.$router.push("/auth");
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
.nav {
  display: flex;
}
.nav p {
  padding: 0px 30px 0px 0px;
  font-size: 18px;
  color: #000;
}
.nav p:hover {
  opacity: 0.7;
}
.nav p a {
  text-decoration: none;
}
.sign-out {
  width: 160px;
  margin: 0 auto;
}
</style>
