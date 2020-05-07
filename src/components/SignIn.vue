// src/components/SignIn.vue
<template>
  <div>
    <h2>Sign In</h2>
    <div class="formcontainer">
      <input v-model="form.username" class="input" placeholder="Username" />
      <input
        type="password"
        v-model="form.password"
        class="input"
        placeholder="Password"
      />
      <button v-on:click="signIn" class="button">Sign In</button>
    </div>
  </div>
</template>
<!-- allows user to sign in and user is signed in using the auth.signIn method-->
<!-- if user is successfully signed in, authState event of signedIn is emitted to redirect them to profile, there is an authstate listender in app.vue -->

<script>
import { Auth } from "aws-amplify";
import { AmplifyEventBus } from "aws-amplify-vue";
export default {
  name: "home",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async signIn() {
      const { username, password } = this.form;
      await Auth.signIn(username, password);
      AmplifyEventBus.$emit("authState", "signedIn");
      this.$router.push("/profile");
    },
  },
};
</script>
