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
      <p class="upload--info">
        1) Search for your book
        <br />2) Select the right option
        <br />3) Upload it for others to use
      </p>
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
      api.getBookToUpload(title, author).then(book => {
        this.bookToSell = book.items[0].volumeInfo;
        console.log(this.bookToSell, "< book i want to sell");
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
  margin-bottom: 5rem;
}
.upload--info {
  line-height: 1.5rem;
  text-align: left;
}
.upload--form-input {
  margin: 8px 0;
}
</style>
