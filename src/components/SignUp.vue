// src/components/SignUp.vue
<template>
  <section class="main">
    <span v-if="err !== null">{{ this.err.error }}</span>
    <span v-if="notification !== undefined">{{ this.notification.notification }}</span>
    <h3 class="h3">{{ formState === "signUp" ? "Sign up" : "Confirm sign up" }}</h3>
    <form class="formcontainer" v-if="formState === 'signUp'" v-on:submit.prevent="signUp">
      <input v-model="form.username" class="input" placeholder="Enter your email address" required />
      <input
        type="password"
        v-model="form.password"
        class="input"
        placeholder="Create a password"
        required
      />
      <button class="btn">Sign up</button>
    </form>
    <form
      class="formcontainer"
      v-if="formState === 'confirmSignUp'"
      v-on:submit.prevent="confirmSignUp"
    >
      <input v-model="form.authCode" class="input" placeholder="Enter your verification code" />
      <button class="btn">Confirm sign up</button>
    </form>
    <button v-on:click="resendConfirmationCode" class="btn">Resend verification code</button>
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
      },
      err: null,
      notification: undefined
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
        if (err.code === "InvalidParameterException") {
          this.err = { error: "Please enter a valid email or password" };
        } else if (err.code === "UsernameExistsException") {
          this.err = {
            error:
              "An account with the given email already exists. Please Sign in."
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
            "You have successfully signed up. Sign in to view the app"
        };
        this.toggle();
      } catch (err) {
        if (err.code === "CodeMismatchException") {
          this.err = {
            error: "Invalid verification code provided, please try again."
          };
        }
      }
    },
    async resendConfirmationCode() {
      const { username } = this.form;
      try {
        await Auth.resendSignUp(username);
        this.notification = {
          notification: "A new verification code has been sent to your email."
        };
      } catch (err) {
        this.err = {
          error:
            "An error has occurred. Please try resending the verification code."
        };
      }
    }
  }
};
</script>

<style scoped>
.formcontainer {
  align-items: center;
}

@media (min-width: 320px) {
  .btn {
    width: 60%;
  }
  .main {
    margin: auto;
    padding-right: 1rem;
  }
}

@media (min-width: 425px) {
  .btn {
    width: 60%;
  }
}

@media (min-width: 768px) {
  .btn {
    width: 70%;
  }
}

@media (min-width: 1024px) {
  .main {
    width: 100%;
  }
}
</style>
