// src/components/SignIn.vue
<template>
  <div>
    <span v-if="err !== null">{{ this.err.error }}</span>
    <div class="formcontainer">
      <input
        v-model="form.username"
        class="input"
        placeholder="Enter your email address"
      />
      <input
        type="password"
        v-model="form.password"
        class="input"
        placeholder="Enter your password"
      />
      <button v-on:click="signIn" class="btn">Sign In</button>
      <button v-on:click="forgotPasswordFlow" class="btn">
        Forgot your password?
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
      err: null,
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
        if (err.code === "UserNotConfirmedException") {
          this.err = { error: "Please enter a valid email" };
        } else if (err.code === "NotAuthorizedException") {
          // The error happens when the incorrect password is provided
          this.err = { error: "Sorry, that email or password is incorrect." };
        } else if (err.code === "UserNotFoundException") {
          // The error happens when the supplied username/email does not exist in the Cognito user pool
          this.err = {
            error: "Sorry, we cannot find an account with that e-mail address",
          };
        } else {
          this.err = { error: "An error has occurred. Please try again." };
        }
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

<style>
.input {
  outline-color: black;
}

.formcontainer {
  display: flex;
  flex-direction: row;
}
</style>
