<template>
  <main class="singleBook main">
    <img class="singleBook--img imgLarge" :src="singleBook.volumeInfo.imageLinks.thumbnail" />
    <h3 class="singleBook--title book--title">{{singleBook.volumeInfo.title}}</h3>
    <p class="singleBook--info book--author">{{singleBook.volumeInfo.authors[0]}}</p>
    <p class="singleBook--info book--subText">distance</p>
    <p>Goodreads rating via api</p>

    <p class="singleBook--description">{{singleBook.volumeInfo.description}}</p>
    <p class="singleBook--info book--subText">Published in {{singleBook.volumeInfo.publishedDate}}</p>
    <button class="singleBook--btn btn">I want this book</button>
    <button class="singleBook--btn btn">Ask the owner a question</button>
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
      singleBook: {}
    };
  },
  methods: {
    fetchBookByTitle() {
      let book_title = this.$route.params.book_title;
      api.getBookByTitle(book_title).then(book => {
        this.singleBook = book.items[0];
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
</style>
