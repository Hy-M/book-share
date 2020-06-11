// src/components/SignUp.vue
<template>
  <section class="main">
    <h3 class="h3">{{ formState === "signUp" ? "Sign up" : "Confirm sign up" }}</h3>
    <form class="formcontainer" v-if="formState === 'signUp'">
      <input v-model="form.username" class="input" placeholder="Enter your email address" />
      <input type="password" v-model="form.password" class="input" placeholder="Create a password" />
      <button v-on:click="signUp" class="btn">Sign up</button>
    </form>
    <form class="formcontainer" v-if="formState === 'confirmSignUp'">
      <input v-model="form.authCode" class="input" placeholder="Enter confirmation code" />
      <button v-on:click="confirmSignUp" class="btn">Confirm sign up</button>
      <button v-on:click="resendConfirmationCode" class="btn">Resend confirmation code</button>
    </form>
  </section>
</template>

<script>
import { Auth } from "aws-amplify";

export default {
  name: "SignOut",
  props: ["toggle"],
  data() {
    return {
      formState: "signUp",
      form: {
        username: "",
        password: "",
        email: ""
      }
    };
  },
  methods: {
    async signUp() {
      const { username, password, email } = this.form;
      try {
        await Auth.signUp({
          username,
          password,
          attributes: { email: username }
        });
        this.formState = "confirmSignUp";
      } catch (err) {
        console.log(err, "err in SignUp");
        alert(err.message);
      }
    },
    async confirmSignUp() {
      const { username, authCode } = this.form;
      try {
        await Auth.confirmSignUp(username, authCode);
        alert("successfully signed up! Sign in to view the app.");
        this.toggle();
      } catch (err) {
        console.log(err, "err in confirmSignUp");
        alert(err.message);
      }
    },
    async resendConfirmationCode() {
      const { username } = this.form;
      try {
        await Auth.resendSignUp(username);
        console.log("code resent successfully");
      } catch (err) {
        console.log(err, "err in resendConfirmationCode");
        alert(err.message);
      }
    }
  }
};
</script>

<style scoped>
.formcontainer {
  align-items: center;
}

@media (min-width: 425px) {
}

@media (min-width: 768px) {
}
</style>
