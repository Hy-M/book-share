// src/components/SignIn.vue
<template>
  <section class="main">
    <h3 class="h3">Sign in</h3>
    <span v-if="err !== null">{{ this.err.error }}</span>
    <span v-if="this.signInHasBeenClicked && this.loading">Loading</span>
    <form class="formcontainer" v-on:submit.prevent="signIn">
      <input v-model="form.username" class="input" placeholder="Enter your email address" />
      <input
        required
        type="password"
        v-model="form.password"
        class="input"
        placeholder="Enter your password"
      />
      <button class="signIn--btn btn">Sign in</button>
    </form>
    <button v-on:click="forgotPasswordFlow" class="signIn--btn btn">Forgot my password</button>
  </section>
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
        password: ""
      },
      signInHasBeenClicked: false,
      loading: false,
      successfulSignIn: false
    };
  },
  methods: {
    async signIn() {
      const { username, password } = this.form;
      this.signInHasBeenClicked = true;
      this.loading = true;
      try {
        await Auth.signIn(username, password);
        AmplifyEventBus.$emit("authState", "signedIn");
        this.successfulSignIn = true;
        this.loading = false;
        this.signInHasBeenClicked = false;
        this.$router.push("/profile");
      } catch (err) {
        if (err.code === "UserNotConfirmedException") {
          this.err = { error: "Please enter a valid email" };
        } else if (err.code === "NotAuthorizedException") {
          // The error happens when the incorrect password is provided
          this.err = { error: "Sorry, that email or password is incorrect." };
        } else if (err.code === "UserNotFoundException") {
          // The error happens when the supplied username/email does not exist in the Cognito user pool
          this.err = {
            error: "Sorry, we cannot find an account with that e-mail address"
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
        console.log(err, "err in forgotPasswordFlow");
        alert(err.message);
      }
    }
  }
};
</script>

<style scoped>
.formcontainer {
  align-items: center;
  display: flex;
  flex-direction: column;
}
@media (min-width: 425px) {
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
