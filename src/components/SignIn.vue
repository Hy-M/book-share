// src/components/SignIn.vue
<template>
  <section class="main">
    <div class="formcontainer">
      <input v-model="form.username" required class="input" placeholder="Enter your email address" />
      <input
        required
        type="password"
        v-model="form.password"
        class="input"
        placeholder="Enter your password"
      />
      <button v-on:click="signIn" class="signIn--btn btn">Sign in</button>
      <button v-on:click="forgotPasswordFlow" class="signIn--btn btn">Forgot my password</button>
    </div>
  </section>
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
</style>
