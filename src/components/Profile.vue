// src/components/Profile.vue

<template>
  <h1>Welcome, {{ user.username }}</h1>
  <!--retrieves the users username by usign amplify -->
</template>

<script>
import { Auth } from "aws-amplify";
import * as api from "../api";

export default {
  name: "Profile",
  data() {
    return {
      user: {},
    };
  },
  //uses the Auth.current method to return meta data about user or error out if user si not signed in
  beforeCreate() {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        this.user = user;
        console.log(user.username);
      })
      .catch(() => {
        alert("Please sign in to view the app.");
      });
  },
};
</script>
