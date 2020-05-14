<template>
  <main class="singleBook main">
    <img class="singleBook--img imgLarge" :src="singleBook.img" />
    <h3 class="singleBook--title book--title">{{ singleBook.title }}</h3>
    <p class="singleBook--info book--author">{{ singleBook.author }}</p>
    <p class="singleBook--info book--distance">{{ singleBook.distance }}</p>
    <p>Goodreads rating via api</p>
    <p class="singleBook--description">
      Description about book. Here we would make API call to get the single
      book by id
    </p>
    <button class="singleBook--btn btn">I want this book</button>
    <button class="singleBook--btn btn">Ask the owner a question</button>
  </main>
</template>

<script>
const booksData = require("../data.json");
const axios = require("axios");

export default {
  mounted() {
    this.getSingleBook();
  },
  methods: {
    getSingleBook() {
      let book_id = Number(this.$route.params.book_id);
      let data = JSON.parse(JSON.stringify(booksData));
      for (let book of data) {
        if (book.id === book_id) {
          this.singleBook = book;
        }
      }
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
  },
  data() {
    return {
      singleBook: {}
    };
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
