<template>
  <div>
    <section class="searchBar main">
      <form
        class="searchBar--form form"
        v-on:submit.prevent="fetchAllSellingBooks"
      >
        <input
          class="searchBar--form-input input"
          type="text"
          placeholder="Enter a title to see if it's available"
          v-model="searchForm.input"
        />
        <button class="searchBar--form-btn btn">Search</button>
      </form>
    </section>
    <p v-if="this.searchHasBeenClicked && this.loading">Loading</p>
    <p v-if="this.searchHasBeenClicked && this.error">
      Sorry, something went wrong.
    </p>
    <p
      v-if="
        this.searchHasBeenClicked && !this.loading && !this.searchResults.length
      "
    >
      We can't find any books matching your search.
    </p>
    <AvailableBooks :searchResults="this.searchResults" />
    <router-link to="/profile">
      <h3 class="availableBooks--h3 h3">Got a spare book lying around?</h3>
    </router-link>
  </div>
</template>

<script>
import AvailableBooks from "./AvailableBooks";
import { Auth } from "aws-amplify";
import * as api from "../api";
export default {
  name: "home",
  components: {
    AvailableBooks
  },
  props: {},
  data() {
    return {
      loading: false,
      error: false,
      searchForm: {
        input: ""
      },
      booksByInput: [],
      searchResults: [],
      searchHasBeenClicked: false
    };
  },
  methods: {
    fetchAllSellingBooks() {
      this.searchHasBeenClicked = true;
      this.loading = true;
      this.booksByInput = [];
      this.searchResults = [];
      return api
        .getAllSellingBooks()
        .then(allBooks => {
          let availableBookTitles = [];
          for (let user of allBooks.body) {
            if (user.Selling) {
              availableBookTitles.push({
                user: user.User,
                email: user.Email,
                titles: [...user.Selling]
              });
            }
          }
          this.error = false;
          if (!availableBookTitles.length) {
            this.loading = false;
            this.error = true;
          }
          this.checkBooksByInput(availableBookTitles);
        })
        .catch(err => {
          console.log(err, "err in fetchALlSellingBooks");
          this.loading = false;
          this.error = true;
        });
    },
    checkBooksByInput(availableBookTitles) {
      for (let obj of availableBookTitles) {
        for (let title of obj.titles) {
          if (
            title.toLowerCase().includes(this.searchForm.input.toLowerCase())
          ) {
            this.booksByInput.push({
              user: obj.user,
              email: obj.email,
              title: title
            });
          }
        }
      }

      this.searchForm.input = "";
      if (!this.booksByInput.length) {
        this.loading = false;
        this.error = false;
      }
      this.fetchBooksByInputDetails();
    },
    fetchBooksByInputDetails() {
      for (let user of this.booksByInput) {
        api
          .getBookByTitle(user.title)
          .then(book => {
            this.searchResults.push({
              user: user.user,
              email: user.email,
              bookDetails: book.items[0]
            });
          })
          .then(() => {
            this.loading = false;
            this.error = false;
          })
          .catch(err => {
            console.log(err, "< err in fetchBooksByInputDetails");
            this.loading = false;
            this.error = true;
          });
      }
    }
  }
};
</script>

<style scoped>
.availableBooks--h3 {
  color: var(--pink-color);
}
.searchBar {
  border-top: 1px solid var(--pink-color);
  border-bottom: 1px solid var(--pink-color);
  padding-bottom: 40px;
}

@media (min-width: 425px) {
  .searchBar {
    padding: 10px 0 50px 0;
  }
}

@media (min-width: 768px) {
  .searchBar {
    padding: 20px 0 100px 0;
  }

  .searchBar--form-btn {
    margin-top: 0.5rem;
  }
}

@media (min-width: 1024px) {
  .searchBar {
    width: 30%;
    border: none;
  }
}
</style>
