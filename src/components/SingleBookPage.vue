<template>
  <main class="singleBook main">
    <p v-if="this.loading">Loading</p>
    <section v-if="this.singleBook.volumeInfo">
      <img class="singleBook--img imgLarge" :src="singleBook.volumeInfo.imageLinks.thumbnail" />
      <h3 class="singleBook--title book--title">{{singleBook.volumeInfo.title}}</h3>
      <p class="singleBook--info book--author">{{singleBook.volumeInfo.authors[0]}}</p>
      <p class="singleBook--info book--subText">distance</p>
      <p class="singleBook--description book--description">{{singleBook.volumeInfo.description}}</p>
      <p class="singleBook--info book--subText">Published in {{singleBook.volumeInfo.publishedDate}}</p>
      <section class="cta">
        <button class="singleBook--btn btn">I want this book</button>
        <button class="singleBook--btn btn">Ask the owner a question</button>
      </section>
    </section>
    <section v-else-if="!this.loading && this.error">
      <p>Sorry, we can't find this book right now.</p>
    </section>
  </main>
</template>

<script>
const booksData = require("../data.json");
const axios = require("axios");
import * as api from "../api.js";

export default {
  mounted() {
    this.fetchBookByTitle();
  },
  data() {
    return {
      singleBook: {},
      loading: true,
      error: false
    };
  },
  methods: {
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
    },
    getGoodreadsReview() {
      return axios
        .get(
          `https://www.goodreads.com/book/title.json?key=MAjR7x0xCuMtoS6C47NnnA&title=Harry+Potter`
        )
        .then(({ data }) => {
          console.log(data);
          return data;
        })
        .catch(err => console.log(err, "< err"));
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
