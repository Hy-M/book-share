// src/components/SignUp.vue
<template>
  <div>
    <span v-if="err !== null">{{ this.err.error }}</span>
    <span v-if="notification !== undefined">{{
      this.notification.notification
    }}</span>
    <h2>{{ formState === "signUp" ? "Sign Up" : "Confirm Sign Up" }}</h2>
    <div class="formcontainer" v-if="formState === 'signUp'">
      <input
        v-model="form.username"
        class="input"
        placeholder="Enter your email address"
        required
      />
      <input
        type="password"
        v-model="form.password"
        class="input"
        placeholder="Create a password"
        required
      />
      <button v-on:click="signUp" class="btn">Sign up</button>
    </div>
    <div class="formcontainer" v-if="formState === 'confirmSignUp'">
      <input
        v-model="form.authCode"
        class="input"
        placeholder="Enter verification code"
      />
      <button v-on:click="confirmSignUp" class="btn">Confirm sign up</button>
      <button v-on:click="resendConfirmationCode" class="btn">
        Resend verification code
      </button>
    </div>
  </div>
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
        email: "",
      },
      err: null,
      notification: undefined,
    };
  },
  methods: {
    async signUp() {
      const { username, password, email } = this.form;
      try {
        await Auth.signUp({
          username,
          password,
          attributes: { email: username },
        });
        this.formState = "confirmSignUp";
      } catch (err) {
        if (err.code === "InvalidParameterException") {
          this.err = { error: "Please enter a valid email or password" };
        } else if (err.code === "UsernameExistsException") {
          this.err = {
            error:
              "An account with the given email already exists. Please Sign in.",
          };
        } else {
          this.err = { error: "An error has occurred. Please try again." };
        }
      }
    },
    async confirmSignUp() {
      const { username, authCode } = this.form;
      try {
        await Auth.confirmSignUp(username, authCode);
        this.notification = {
          notification:
            "You have successfully signed up. Sign in to view the app",
        };
        this.toggle();
      } catch (err) {
        if (err.code === "CodeMismatchException") {
          this.err = {
            error: "Invalid verification code provided, please try again.",
          };
        }
      }
    },
    async resendConfirmationCode() {
      const { username } = this.form;
      try {
        await Auth.resendSignUp(username);
        this.notification = {
          notification: "A new verification code has been sent to your email.",
        };
      } catch (err) {
        this.err = {
          error:
            "An error has occurred. Please try resending the verification code.",
        };
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
