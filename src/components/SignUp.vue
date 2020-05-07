// src/components/SignUp.vue
<template>
  <div>
    <h2>{{ formState === "signUp" ? "Sign Up" : "Confirm Sign Up" }}</h2>
    <div class="formcontainer" v-if="formState === 'signUp'">
      <input v-model="form.username" class="input" placeholder="Username *" />
      <input v-model="form.email" class="input" placeholder="Email *" />
      <input
        type="password"
        v-model="form.password"
        class="input"
        placeholder="Password *"
      />
      <button v-on:click="signUp" class="button">Sign Up</button>
    </div>
    <div class="formcontainer" v-if="formState === 'confirmSignUp'">
      <input v-model="form.authCode" class="input" />
      <button v-on:click="confirmSignUp" class="button">Confirm Sign Up</button>
    </div>
  </div>
</template>
<!--two seperate forms, one for signing up and one for confirming sign up -->
<!--formstate boolean will toggle between two forms, form property on data object will keep the username, password and email-->

<script>
export default {};
</script>

<style></style>
<script>
import { Auth } from "aws-amplify";

export default {
  name: "home",
  props: ["toggle"],
  data() {
    return {
      formState: "signUp",
      form: {
        username: "",
        password: "",
        email: "",
      },
    };
  },
  //calls sign up method which calls amplifys sign up method passing in the form properties
  methods: {
    async signUp() {
      const { username, password, email } = this.form;
      await Auth.signUp({
        username,
        password,
        attributes: { email },
      });
      this.formState = "confirmSignUp";
    },
    //confirmsign up method calls the amplify authConfirmSignUp page passing in the username and authCode
    async confirmSignUp() {
      const { username, authCode } = this.form;
      await Auth.confirmSignUp(username, authCode);
      alert("successfully signed up! Sign in to view the app.");
      this.toggle();
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
