<template>
  <div>
    <main class="availableBooks main">
      <section v-if="this.searchResults.length >= 1">
        <h3 class="availableBooks--h3 h3">Search results</h3>
        <section class="availableBooks--all">
          <div
            class="availableBooks--book"
            v-for="(book, index) of searchResults"
            v-bind:key="index"
          >
            <router-link :to="`/browse/${book.user}/${book.bookDetails.volumeInfo.title}`">
              <img
                class="availableBooks--book-img imgPreview"
                :src="book.bookDetails.volumeInfo.imageLinks.smallThumbnail"
              />
              <h4
                class="availableBooks--book-h4 book--title"
              >{{ book.bookDetails.volumeInfo.title }}</h4>
            </router-link>
            <p
              class="availableBooks--book-info book--author"
            >{{ book.bookDetails.volumeInfo.authors[0] }}</p>
          </div>
        </section>
      </section>
      <h3 class="availableBooks--h3 h3">Browse books for sharing in Kirklees</h3>
      <section
        class="availableBooks--all"
        v-for="(book, index) of availableBooks"
        v-bind:key="index"
      >
        <BooksList :book="book" />
      </section>
    </main>
  </div>
</template>

<script>
const booksData = require("../data.json");
import BooksList from "./BooksList";
import * as api from "../api.js";

export default {
  components: {
    BooksList
  },
  props: {
    searchResults: {
      type: Array
    }
  },
  data() {
    return {
      availableBooks: [],
      availableBookImages: [],
      loading: true,
      error: false,
      desCoordinates: {},
      srcCoordinates: {},
      distance: "",
      userDistances: []
    };
  },
  methods: {
    fetchAllSellingBooks() {
      return api
        .getAllSellingBooks()
        .then(allBooks => {
          let availableBookTitles = [];
          if (allBooks.body.length >= 1) {
            for (let user of allBooks.body) {
              if (user.Selling) {
                availableBookTitles.push({
                  user: user.User,
                  email: user.Email,
                  titles: [...user.Selling],
                  address: user.Address
                });
              }
            }

            return availableBookTitles;
          } else {
            this.loading = false;
            this.error = true;
          }
        })
        .then(availableBookTitles => {
          this.fetchBookByTitle(availableBookTitles);
        })
        .catch(err => {
          this.loading = false;
          this.error = true;
        });
    },
    fetchBookByTitle(availableBookTitles) {
      for (let user of availableBookTitles) {
        for (let title of user.titles) {
          api
            .getBookByTitle(title)
            .then(book => {
              this.availableBooks.push({
                user: user.user,
                email: user.email,
                bookDetails: book.items[0].volumeInfo,
                distance: undefined,
                address: user.address
              });
            })
            .catch(err => {
              console.log(err, "err in fetchBookByTitle");
              this.loading = false;
              this.error = true;
            });
        }
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

.availableBooks--all {
  width: 100%;
}

@media (min-width: 425px) {
}

@media (min-width: 768px) {
}

@media (min-width: 1024px) {
}
</style>
