// src/components/SignUp.vue
<template>
  <div>
    <span v-if="err !== null">{{ this.err.error }}</span>
    <h2>{{ formState === "signUp" ? "Sign Up" : "Confirm Sign Up" }}</h2>
    <div class="formcontainer" v-if="formState === 'signUp'">
      <input
        v-model="form.username"
        class="input"
        placeholder="Enter your email address"
      />
      <input
        type="password"
        v-model="form.password"
        class="input"
        placeholder="Create a password"
      />
      <button v-on:click="signUp" class="btn">Sign Up</button>
    </div>
    <div class="formcontainer" v-if="formState === 'confirmSignUp'">
      <input
        v-model="form.authCode"
        class="input"
        placeholder="Enter confirmation code"
      />
      <button v-on:click="confirmSignUp" class="btn">Confirm Sign Up</button>
      <button v-on:click="resendConfirmationCode" class="btn">
        Resend Confirmation Code
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
        console.log("error signing up ", err);
        if (err.code === "InvalidParameterException") {
          this.err = { error: "Please enter a valid email or password" };
        } else if (err.code === "UsernameExistsException") {
          this.err = {
            error:
              "An account with the given email already exists. Please Sign In",
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
        alert("successfully signed up! Sign in to view the app.");
        this.toggle();
      } catch (err) {
        console.log("error confirming signing up ", err);
      }
    },
    async resendConfirmationCode() {
      const { username } = this.form;
      try {
        await Auth.resendSignUp(username);
        console.log("code resent successfully");
      } catch (err) {
        console.log("error resending code ", err);
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
