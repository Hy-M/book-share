<template>
  <main class="main">
    <section class="userStatus">
      <p class="userStatus--status">Hello, {{ this.user.attributes.email }}</p>
      <button v-on:click="signOut" class="user--btn btn">Log out</button>
    </section>
    <section class="bookshelves">
      <h4 class="h4">My bookshelf</h4>
      <CarouselComponent :images="this.purchasedBooksImages" />
      <h4 class="h4">Books i'm giving away</h4>
      <CarouselComponent :images="this.sellingBooksImages" />
    </section>

    <section class="upload">
      <h3 class="h3">Shook - share your old books!</h3>
      <ol class="upload--info">
        <li>Make sure you're ready to part with the book forever</li>
        <li>Enter the title and author</li>
        <li>Check that the book details are correct then click confirm!</li>
      </ol>
      <form class="upload--form form" v-on:submit.prevent="fetchBookToUpload">
        <input
          required
          class="upload--form-input input"
          placeholder="Enter book title"
          v-model="uploadForm.inputTitle"
        />
        <input
          required
          class="upload--form-input input"
          placeholder="Enter book author"
          v-model="uploadForm.inputAuthor"
        />
        <button class="upload--form-btn btn">Find book</button>
      </form>
    </section>
    <section class="list" v-if="this.bookToSell.title">
      <h4 class="list--title h4">{{ this.bookToSell.title }}</h4>
      <p class="list--info">{{ this.bookToSell.authors[0] }}</p>
      <img class="imgPreview" :src="this.bookToSell.imageLinks.thumbnail" />
      <button class="btn" v-on:click="listBook">Confirm</button>
      <!-- <p class="list--subtext">
        Please enter the postcode where this book will be available to collect
        from in UPPERCASE
      </p>
      <form class="upload--form form" v-on:submit.prevent="checkPostcode">
        <input
          required
          class="upload--form-input input"
          placeholder="Enter your postcode"
          v-model="uploadForm.inputPostcode"
          pattern="^([A-Z][A-HJ-Y]?[0-9][A-Z0-9]? ?[0-9][A-Z]{2}|GIR ?0A{2})$"
        />
        <button class="list--btn btn">List this book</button>
      </form>-->
    </section>
    <section v-if="this.uploadHasBeenClicked && this.error">
      <p class="list--subtext">Sorry, we can't find this book!</p>
    </section>

    <!-- <section v-if="!this.uploadForm.inputPoscode && this.error">
      <p class="list--subtext">Please enter a valid UK postcode</p>
    </section>-->
  </main>
</template>

<script>
import { Auth } from "aws-amplify";
import { AmplifyEventBus } from "aws-amplify-vue";
import * as api from "../api";
import CarouselComponent from "./CarouselComponent.vue";
const data = require("../data.json");
const sellingData = require("../sellingData.json");

export default {
  name: "Profile",
  components: {
    CarouselComponent
  },
  data() {
    return {
      user: {},
      username: "",
      uploadHasBeenClicked: false,
      error: false,
      uploadForm: {
        inputTitle: null,
        inputAuthor: null,
        inputPostcode: null
      },
      bookToSell: {},
      purchasedBooks: [],
      purchasedBooksImages: [],
      sellingBooks: [],
      sellingBooksImages: []
    };
  },
  //uses the Auth.current method to return meta data about user or error out if user si not signed in
  beforeCreate() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.user = user;
      })
      .catch(err => {
        console.log(err, "<-error getting user data");
      });
  },
  methods: {
    async signOut() {
      try {
        await Auth.signOut();
        AmplifyEventBus.$emit("authState", "signedOut");
        this.$router.push("Home");
      } catch (error) {
        console.log("error signing out: ", error);
      }
    },
    getUserAttributes() {
      Auth.currentUserInfo().then(currentUser => {
        this.username = currentUser.username;
        this.fetchPurchasedBooks();
        this.fetchSellingBooks();
      });
    },
    fetchBookToUpload() {
      let title = this.uploadForm.inputTitle;
      let author = this.uploadForm.inputAuthor;
      this.uploadHasBeenClicked = true;
      api
        .getBookToUpload(title, author)
        .then(book => {
          if (book.items[0]) {
            this.error = false;
            this.uploadForm.inputTitle = "";
            this.uploadForm.inputAuthor = "";
            this.bookToSell = book.items[0].volumeInfo;
            this.uploadHasBeenClicked = false;
          } else {
            this.error = true;
          }
        })
        .catch(err => {
          console.log("Error getting user attributes");
        });
    },
    fetchPurchasedBooks() {
      api
        .getPurchasedBooks(this.username)
        .then(books => {
          this.purchasedBooks = books.Purchased;
          this.fetchUsersBooksImages(
            this.purchasedBooks,
            this.purchasedBooksImages
          );
        })
        .catch(err => console.log(err, "< err in fetchPurchasedBooks"));
    },
    fetchSellingBooks() {
      api
        .getSellingBooks(this.username)
        .then(books => {
          this.sellingBooks = books.Selling;
          this.fetchUsersBooksImages(
            this.sellingBooks,
            this.sellingBooksImages
          );
        })
        .catch(err => console.log(err, "< err in fetchSellingBooks"));
    },
    fetchUsersBooksImages(collection, collectionImages) {
      for (let book of collection) {
        api
          .getBookByTitle(book)
          .then(bookDetails => {
            if (
              !collectionImages.includes(
                bookDetails.items[0].volumeInfo.imageLinks.thumbnail
              )
            ) {
              collectionImages.push(
                bookDetails.items[0].volumeInfo.imageLinks.thumbnail
              );
            }
          })
          .catch(err => console.log(err, "< err in fetchUsersBooksImages()"));
      }
    },
    checkPostcode() {
      return api
        .validatePostcode(this.uploadForm.inputPostcode)
        .then(({ result }) => {
          if (result) {
            this.uploadForm.inputPostcode = null;
            this.error = false;
            this.listBook();
          } else {
            this.uploadForm.inputPostcode = null;
            this.error = true;
          }
        })
        .catch(err => console.log(err, "< err in checkPostcode"));
    },
    fetchBookToUpload() {
      let title = this.uploadForm.inputTitle;
      let author = this.uploadForm.inputAuthor;
      this.uploadHasBeenClicked = true;
      api
        .getBookToUpload(title, author)
        .then(book => {
          if (book.items[0]) {
            this.error = false;
            this.uploadForm.inputTitle = "";
            this.uploadForm.inputAuthor = "";
            this.bookToSell = book.items[0].volumeInfo;
            this.uploadHasBeenClicked = false;
          } else {
            this.error = true;
          }
        })
        .catch(err => {
          this.error = true;
          console.log(err, "< err in fetchBookToUpload");
        });
    },
    listBook() {
      let sellingBookArr = [this.bookToSell.title];
      api.updateSellingBooks(this.username, sellingBookArr).then(() => {
        this.fetchSellingBooks();
      });
    }
  },
  mounted() {
    this.getUserAttributes();
    // this.fetchUsersBooks();
  }
};
</script>

<style>
.userStatus {
  border-top: 1px solid var(--pink-color);
  border-bottom: 1px solid var(--pink-color);
  padding-bottom: 20px;
}

.upload {
  border-top: 1px solid var(--pink-color);
  margin: 1rem 0 4rem 0;
}

.upload--info li {
  line-height: 1.4rem;
  text-align: left;
  padding: 8px 0;
}

.upload--form-input {
  margin: 8px 0;
}

.list--info {
  text-transform: uppercase;
}

.list--subtext {
  font-size: 0.9rem;
  line-height: 1.4rem;
}
</style>
