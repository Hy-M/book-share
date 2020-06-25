<template>
  <main class="singleBook main">
    <p v-if="this.loading">Loading</p>
    <section v-if="this.singleBook.volumeInfo">
      <img class="singleBook--img imgLarge" :src="singleBook.volumeInfo.imageLinks.thumbnail" />
      <h3 class="singleBook--title book--title">{{ singleBook.volumeInfo.title }}</h3>
      <p class="singleBook--info book--author">{{ singleBook.volumeInfo.authors[0] }}</p>
      <p class="singleBook--description book--description">{{ singleBook.volumeInfo.description }}</p>
      <p
        class="singleBook--info book--subText"
      >Published in {{ singleBook.volumeInfo.publishedDate }}</p>
      <section class="cta">
        <button
          v-if="this.currentUser !== this.userEmail"
          class="singleBook--btn btn"
          v-on:click="isVisible = !isVisible"
        >{{ !this.isVisible ? "Contact Seller" : "Hide Contact Info" }}</button>
      </section>
    </section>
    <section v-else-if="!this.loading && this.error">
      <p>Sorry, we can't find this book right now.</p>
    </section>
    <Email
      v-if="isVisible"
      :userEmail="this.userEmail"
      :bookTitle="this.singleBook.volumeInfo.title"
    />
  </main>
</template>

<script>
const booksData = require("../data.json");
const axios = require("axios");
import * as api from "../api.js";
import Email from "./Email";
import { Auth } from "aws-amplify";
import { AmplifyEventBus } from "aws-amplify-vue";

export default {
  components: {
    Email
  },
  mounted() {
    this.fetchBookByTitle();
    this.fetchEmailDetails();
  },
  data() {
    return {
      currentUser: "",
      singleBook: {},
      userEmail: "",
      isVisible: false,
      loading: true,
      error: false
    };
  },
  beforeCreate() {
    Auth.currentUserInfo().then(user => {
      this.currentUser = user.attributes.email;
    });
  },
  methods: {
    fetchEmailDetails() {
      let User = this.$route.params.user;
      api.getUser(User).then(data => {
        this.userEmail = data.Email;
      });
    },
    fetchBookByTitle() {
      let book_title = this.$route.params.book_title;
      api
        .getBookByTitle(book_title)
        .then(book => {
          this.singleBook = book.items[0];
          this.loading = false;
        })
        .catch(err => {
          console.log(err, "err in fetchBookByTitle");
          this.error = true;
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.singleBook {
  margin-bottom: 2rem;
}

.singleBook--btn {
  width: 100%;
  margin: 8px 0;
}

@media (min-width: 425px) {
  .singleBook {
    margin-top: 1rem;
  }
}

@media (min-width: 768px) {
  .singleBook {
    margin-top: 2rem;
  }
}

@media (min-width: 1024px) {
  .main {
    width: 50%;
  }
  .singleBook--btn {
    width: 40%;
  }

  .cta {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
