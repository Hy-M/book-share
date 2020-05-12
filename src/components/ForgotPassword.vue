// src/components/Home.vue
<template>
  <div>
    <h1>Forgot Password</h1>
    <h2>
      {{
        formState === "forgotPassword"
          ? "forgotPassword"
          : "forgotPasswordSubmit"
      }}
    </h2>
    <div class="formcontainer" v-if="formState === 'forgotPassword'">
      <input v-model="form.username" class="input" placeholder="Email:" />
      <button v-on:click="forgotPassword" class="button">Verify Email</button>
    </div>
    <div class="formcontainer" v-if="formState === 'forgotPasswordSubmit'">
      <input v-model="form.username" class="input" placeholder="Email:" />
      <input
        v-model="form.authCode"
        class="input"
        placeholder="Confirmation Code"
      />
      <input
        type="password"
        v-model="form.newPassword"
        class="input"
        placeholder="New Password"
      />
      <button v-on:click="forgotPasswordSubmit" class="button">
        Reset Password
      </button>
    </div>
  </div>
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
        newPassword: "",
      },
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
    },
  },
};
</script>

<style>
.formcontainer {
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 0 auto;
}
.input {
  margin-bottom: 7px;
  height: 38px;
  border: none;
  outline: none;
  border-bottom: 2px solid #ddd;
  font-size: 20px;
}
.button {
  height: 45px;
  border: none;
  outline: none;
  background-color: #dddddd;
  margin-top: 8px;
  cursor: pointer;
  font-size: 18px;
}
.button:hover {
  opacity: 0.7;
}
</style>
