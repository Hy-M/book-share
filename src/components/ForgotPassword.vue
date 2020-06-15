// src/components/Home.vue
<template>
  <div>
    <span v-if="err !== null">{{ this.err.error }}</span>
    <h2>
      {{
        formState === "forgotPassword"
          ? "forgotPassword"
          : "forgotPasswordSubmit"
      }}
    </h2>
    <div class="formcontainer" v-if="formState === 'forgotPassword'">
      <input
        v-model="form.username"
        class="input"
        placeholder="Email:"
        required
      />
      <button v-on:click="forgotPassword" class="button">Verify Email</button>
    </div>
    <div class="formcontainer" v-if="formState === 'forgotPasswordSubmit'">
      <input
        v-model="form.username"
        class="input"
        placeholder="Email:"
        required
      />
      <input
        v-model="form.authCode"
        class="input"
        placeholder="Confirmation Code"
        required
      />
      <input
        type="password"
        v-model="form.newPassword"
        class="input"
        placeholder="New Password"
        required
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
      err: null,
      notifcation: undefined,
    };
  },
  methods: {
    async forgotPassword() {
      const { username } = this.form;
      if (this.form) {
        try {
          await Auth.forgotPassword(username);
          this.formState = "forgotPasswordSubmit";
        } catch (err) {
          console.log("error", err);
          if (err.code === "UserNotFoundException") {
            // The error happens when the supplied username/email does not exist in the Cognito user pool
            this.err = {
              error:
                "Sorry, we cannot find an account with that e-mail address",
            };
          }
        }
      }
      if (!this.form) {
        this.err = { error: "Email required" };
      }
    },
    async forgotPasswordSubmit() {
      if (!this.username) {
        this.err = { error: "Email required" };
      }
      if (!this.authCode) {
        this.err = { error: "Verification code required" };
      }
      if (!this.newPassword) {
        this.err = { error: "New password required" };
      }
      const { username, authCode, newPassword } = this.form;
      if (this.form) {
        try {
          await Auth.forgotPasswordSubmit(username, authCode, newPassword);
          await Auth.signIn(username, newPassword);
          AmplifyEventBus.$emit("authState", "signedIn");
          this.$router.push("/profile");
        } catch (err) {
          console.log("error submitting new password", err);
          if (err.code === "UserNotFoundException") {
            // The error happens when the supplied username/email does not exist in the Cognito user pool
            this.err = {
              error:
                "Sorry, we cannot find an account with that e-mail address",
            };
          } else if (err.code === "InvalidParameterException") {
            this.err = { error: "Please enter a valid email or password" };
          } else if (err.code === "CodeMismatchException") {
            this.err = {
              error: "Invalid verification code provided, please try again.",
            };
          } else if (err.code === "LimitExceededException") {
            this.err = {
              error: "Attempt limit exceeded. Please try again later.",
            };
          } else {
            this.err = { error: "An error has occurred. Please try again." };
          }
        }
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
