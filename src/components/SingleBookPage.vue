<template>
  <div>
    <main class="main">
      <img :src="singleBook.img" />
      <h2>{{ singleBook.title }}</h2>
      <p>{{ singleBook.author }}</p>
      <p>{{ singleBook.distance }}</p>
      <p>Goodreads rating via api</p>
      <p>
        Description about book. Here we would make API call to get the single
        book by id
      </p>
      <button>I want this book</button>
      <button>Ask the owner a question</button>
    </main>
  </div>
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
img {
  height: 200px;
  width: 200px;
  align-self: center;
}
</style>
