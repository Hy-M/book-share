<template>
  <div>
    <main class="availableBooks main">
      <h3 class="availableBooks--h3 h3">Browse books for sharing near you</h3>
      <p v-if="this.loading">Loading</p>
      <section class="availableBooks--all">
        <div
          class="availableBooks--book"
          v-for="(book, index) of availableBooks"
          v-bind:key="index"
        >
          <router-link :to="`/browse/${book.user}/${book.bookDetails.volumeInfo.title}`">
            <img
              class="availableBooks--book-img imgPreview"
              :src="book.bookDetails.volumeInfo.imageLinks.smallThumbnail"
            />

            <h4 class="availableBooks--book-h4 book--title">{{ book.bookDetails.volumeInfo.title }}</h4>
          </router-link>
          <p
            class="availableBooks--book-info book--author"
          >{{book.bookDetails.volumeInfo.authors[0]}}</p>
          <p class="availableBooks--book-info book--subText">distance</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
const booksData = require("../data.json");
import * as api from "../api.js";

export default {
  data() {
    return {
      availableBooks: [],
      loading: true
    };
  },
  methods: {
    calculateDistance() {
      let postcode = this.availableBooks[0].postcode;
      //   api.getPostcode(postcode).then((result) => {
      //     console.log(result, "< result");
      //   });
    },
    fetchAllSellingBooks() {
      api.getAllSellingBooks().then(allBooks => {
        let availableBookTitles = [];
        for (let user of allBooks.body) {
          if (user.Selling) {
            availableBookTitles.push({
              user: user.User,
              titles: [...user.Selling]
            });
          }
        }

        this.fetchBookByTitle(availableBookTitles);
      });
    },
    fetchBookByTitle(availableBookTitles) {
      for (let user of availableBookTitles) {
        for (let title of user.titles) {
          api.getBookByTitle(title).then(book => {
            this.availableBooks.push({
              user: user.user,
              bookDetails: book.items[0]
            });
          });
        }
      }
      this.loading = false;
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

.book--description {
  line-height: 1.3rem;
}

.book--subText {
  font-size: 0.9rem;
  margin: 0.5rem;
}

@media (min-width: 425px) {
  .book--title {
    padding-top: 5px;
    font-size: 1.3rem;
    line-height: 1.8rem;
  }

  .book--description {
    line-height: 1.4rem;
  }
}

@media (min-width: 768px) {
  .availableBooks--all {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .availableBooks--book {
    justify-content: space-between;
  }

  .book--title {
    font-size: 1.5rem;
    line-height: 2rem;
    margin-top: 1rem;
  }

  .book--subText {
    margin: 1rem 0;
  }

  .book--description {
    font-size: 1.1rem;
    line-height: 1.8rem;
  }
}

@media (min-width: 1024px) {
  .availableBooks--all {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .book--author {
    font-size: 1.1rem;
    margin-top: 1rem;
  }

  .book--description {
    margin-top: 2rem;
  }
}
</style>
