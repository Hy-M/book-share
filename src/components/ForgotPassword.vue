// src/components/Home.vue
<template>
  <section class="main">
    <h3 class="h3">
      {{
      formState === "forgotPassword"
      ? "I've forgotten my password"
      : "I've forgotten my password"
      }}
    </h3>
    <div class="formcontainer" v-if="formState === 'forgotPassword'">
      <input v-model="form.username" class="input" required placeholder="Enter your email address" />
      <button v-on:click="forgotPassword" class="btn">Verify email</button>
    </div>
    <div class="formcontainer main" v-if="formState === 'forgotPasswordSubmit'">
      <input v-model="form.username" class="input" placeholder="Enter your email address" />
      <input v-model="form.authCode" class="input" placeholder="Enter your confirmation code" />
      <input
        type="password"
        v-model="form.newPassword"
        class="input"
        placeholder="Enter your new password"
      />
      <button v-on:click="forgotPasswordSubmit" class="btn">Reset password</button>
    </div>
  </section>
</template>

<script>
import { Auth } from "aws-amplify";
import { AmplifyEventBus } from "aws-amplify-vue";
import Profile from "./Profile";
export default {
  name: "ForgotPassword",
  props: ["toggle"],
  data() {
    return {
      formState: "forgotPassword",
      form: {
        username: "",
        newPassword: ""
      }
    };
  },
  methods: {
    async forgotPassword() {
      const { username } = this.form;
      try {
        await Auth.forgotPassword(username);
        this.formState = "forgotPasswordSubmit";
      } catch (err) {
        console.log("error", err);
        alert(err.message);
      }
    },
    async forgotPasswordSubmit() {
      const { username, authCode, newPassword } = this.form;
      try {
        await Auth.forgotPasswordSubmit(username, authCode, newPassword);
        await Auth.signIn(username, newPassword);
        AmplifyEventBus.$emit("authState", "signedIn");
        this.$router.push("/profile");
      } catch (err) {
        console.log("error submitting new password", err);
        alert(err.message);
      }
    }
  }
};
</script>

<style>
</style>
