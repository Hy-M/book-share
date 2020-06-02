// src/components/SignIn.vue
<template>
  <div>
    <div class="formcontainer">
      <input v-model="form.username" class="input" placeholder="Enter your email address" />
      <input
        type="password"
        v-model="form.password"
        class="input"
        placeholder="Enter your password"
      />
      <button v-on:click="signIn" class="btn">Sign In</button>
      <button v-on:click="forgotPasswordFlow" class="btn">Forgot your password?</button>
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
        password: ""
      }
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
    }
  }
};
</script>

<style>
.input {
  outline-color: black;
}

.formcontainer {
  display: flex;
  flex-direction: row;
}
</style>
