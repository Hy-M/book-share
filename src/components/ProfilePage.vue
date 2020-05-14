<template>
  <main class="main">
    <section class="userStatus">
      <p class="userStatus--status">Hello, user 1</p>
      <button class="user--btn btn">Log out</button>
    </section>

    <section class="bookshelves">
      <h4 class="h4">My bookshelf</h4>
      <CarouselComponent :images="this.purchasedBooksImages" />
      <h4 class="h4">Books i'm giving away</h4>
      <CarouselComponent :images="this.sellingBooksImages" />
    </section>

    <section class="upload">
      <h3 class="h3">Got a spare book lying around?</h3>
      <ol class="upload--info">
        <li>Check that the book is available to give away</li>
        <li>Enter the title and author below</li>
        <li>List it for someone else to get hooked!</li>
      </ol>
      <form class="upload--form form" v-on:submit.prevent="fetchBookToUpload">
        <input
          class="upload--form-input input"
          placeholder="Enter book title"
          v-model="uploadForm.inputTitle"
        />
        <input
          class="upload--form-input input"
          placeholder="Enter book author"
          v-model="uploadForm.inputAuthor"
        />
        <button class="upload--form-btn btn">Find book</button>
      </form>
    </section>
    <section class="list" v-if="this.bookToSell.title">
      <h4 class="list--title h4">{{this.bookToSell.title}}</h4>
      <p class="list--info">{{this.bookToSell.authors[0]}}</p>
      <img class="imgPreview" :src="this.bookToSell.imageLinks.thumbnail" />
      <button class="list--btn btn">List this book</button>
    </section>
    <section v-if="this.uploadHasBeenClicked && this.error">
      <p>Sorry, we can't find this book!</p>
    </section>
  </main>
</template>

<script>
import CarouselComponent from "./CarouselComponent.vue";
import * as api from "../api.js";
const data = require("../data.json");
const sellingData = require("../sellingData.json");

export default {
  components: {
    CarouselComponent
  },
  data() {
    return {
      uploadHasBeenClicked: false,
      error: false,
      uploadForm: {
        inputTitle: "",
        inputAuthor: ""
      },
      bookToSell: {},
      purchasedBooks: [],
      purchasedBooksImages: [],
      sellingBooks: [],
      sellingBooksImages: []
    };
  },
  methods: {
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
          } else {
            this.error = true;
          }
        })
        .catch(err => {
          this.error = true;
          console.log(err, "< err in fetchBookToUpload");
        });
    },
    fetchUsersBooks() {
      this.purchasedBooks = data;
      this.sellingBooks = sellingData;

      this.fetchUsersBooksImages(
        this.purchasedBooks,
        this.purchasedBooksImages
      );

      this.fetchUsersBooksImages(this.sellingBooks, this.sellingBooksImages);
    },
    fetchUsersBooksImages(collection, collectionImages) {
      for (let book of collection) {
        api
          .getBookByTitle(book.title)
          .then(book => {
            collectionImages.push(
              book.items[0].volumeInfo.imageLinks.thumbnail
            );
          })
          .catch(err => console.log(err, "< err in fetchUsersBooksImages()"));
      }
    }
  },
  mounted() {
    this.fetchUsersBooks();
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
</style>
