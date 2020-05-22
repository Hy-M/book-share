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
      <button v-on:click="forgotPasswordFlow" class="button">
        Forgot Password ?
      </button>
    </div>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import { AmplifyEventBus } from "aws-amplify-vue";
export default {
  name: "SignIn",
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
        this.$router.push("Profile");
      } catch (err) {
        console.log("error signing in", err);
        // alert(err.message);
      }
    },
    async forgotPasswordFlow() {
      try {
        this.$router.push("ForgotPassword");
      } catch (err) {
        console.log("error", err);
        alert(err.message);
      }
    },
  },
};
</script>

<!--vagesiw656@zaelmo.com-->
