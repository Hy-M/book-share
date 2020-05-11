// src/components/SignIn.vue
<template>
  <div>
    <h2>Sign In</h2>
    <div class="formcontainer">
      <input v-model="form.username" class="input" placeholder="Email:" />
      <input
        type="password"
        v-model="form.password"
        class="input"
        placeholder="Password:"
      />
      <button v-on:click="signIn" class="button">Sign In</button>
    </div>
  </div>
</template>

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
      try {
        await Auth.signIn(username, password);
        AmplifyEventBus.$emit("authState", "signedIn");
        this.$router.push("/profile");
      } catch (err) {
        console.log("error signing in", err);
      }
    },
  },
};
</script>
