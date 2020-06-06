<template>
  <div>
    <main class="availableBooks main">
      <h3 class="availableBooks--h3 h3">Browse books for sharing near you</h3>
      <div class="availableBooks--book" v-for="book of availableBooks" v-bind:key="book.user">
        <router-link :to="`/browse/${book.user}/${book.bookDetails.volumeInfo.title}`">
          <img
            class="availableBooks--book-img imgPreview"
            :src="book.bookDetails.volumeInfo.imageLinks.smallThumbnail"
          />

          <h4 class="availableBooks--book-h4 book--title">{{ book.bookDetails.volumeInfo.title }}</h4>
        </router-link>
        <p class="availableBooks--book-info book--author">{{book.bookDetails.volumeInfo.authors[0]}}</p>
        <p class="availableBooks--book-info book--subText">distance</p>
      </div>
    </main>
  </div>
</template>

<script>
const booksData = require("../data.json");
import * as api from "../api.js";
export default {
  data() {
    return {
      availableBooks: []
    };
  },
  methods: {
    calculateDistance() {
      let postcode = this.availableBooks[0].postcode;
      //   api.getPostcode(postcode).then((result) => {
      //     console.log(result, "< result");
      //   });
    },
    async fetchAllSellingBooks() {
      await api.getAllSellingBooks().then(books => {
        // console.log(book);
        let availableBookTitles = [];
        let result = books.body.map(book => {
          // console.log(b, "<----single book");
          // console.log(b.Email, "<----single book");
          // console.log(b.Selling);
          if (book.Selling) {
            availableBookTitles.push(book);
          }
        });
        console.log(availableBookTitles, "<-- avaialble book titles");
        // while (availableBookTitles.length < 8) {
        //   let randomNum = Math.floor(Math.random() * book.body.length);
        //   if (book.body[randomNum].Selling) {
        //     availableBookTitles.push({
        //       user: book.body[randomNum].User,
        //       title: book.body[randomNum].Selling[0]
        //     });
        //   }
        // }
        this.fetchBookByTitle(availableBookTitles);
      });
    },
    fetchBookByTitle(availableBookTitles) {
      for (let item of availableBookTitles) {
        // console.log(item);
        item.Selling.forEach(title => {
          // console.log(title, "<--- book arr");
          api.getBookByTitle(title).then(details => {
            this.availableBooks.push({
              bookDetails: details.items[0]
            });
            // console.log(this.availableBooks, "<----");
          });
        });

        // console.log(item, "<---item");
        //   api.getBookByTitle(item.title).then(book => {
        //     this.availableBooks.push({
        //       user: item.user,
        //       bookDetails: book.items[0]
        //     });
        //   });
      }
    }
  },
  mounted() {
    this.fetchAllSellingBooks();
  }
};
</script>

<style>
.availableBooks {
  margin-top: 2rem;
}

.availableBooks--book {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem 0;
}

.book--title {
  text-decoration: none;
  color: var(--brown-color);
  margin: 0.3rem;
  text-transform: capitalize;
  line-height: 1.4rem;
}

.book--author {
  text-transform: capitalize;
  margin: 0.5rem;
}

.book--subText {
  font-size: 0.9rem;
  margin: 0.5rem;
}
</style>
