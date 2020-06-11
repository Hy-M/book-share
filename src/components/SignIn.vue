// src/components/SignIn.vue
<template>
  <section class="main">
    <h3 class="h3">Sign in</h3>
    <form class="formcontainer">
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
    </form>
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
        console.log(err, "err in signIn");
        // alert(err.message);
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
</style>
