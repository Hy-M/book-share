<template>
  <main v-if="this.user.attributes" class="main">
    <section class="userStatus">
      <p class="userStatus--status">Hello, {{ this.user.attributes.email }}</p>
      <button v-on:click="signOut" class="user--btn btn">Log out</button>
    </section>
    <!-- <section class="bookshelves" id="Purchased">
      <h4 class="h4">My bookshelf</h4>
      <p class="list--subtext" v-if="this.loading">Loading</p>
      <p
        class="list--subtext"
        v-if="!this.purchasedBooks.length && !this.loading"
      >You haven't purchased any books yet</p>
      <CarouselComponent
        :images="this.purchasedBooksImages"
        :username="this.username"
        status="Purchased"
      />
    </section>-->
    <section class="bookshelves" id="Selling">
      <h4 class="h4">Books you're giving away</h4>
      <p class="list--subtext" v-if="this.loading">Loading</p>
      <p
        class="list--subtext"
        v-if="!this.sellingBooks.length && !this.loading"
      >You haven't sold any books yet</p>
      <CarouselComponent
        :images="this.sellingBooksImages"
        :deleteBook="this.deleteBook"
        :deleted="this.deleted"
      />
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
        <button
          class="upload--form-btn btn"
        >{{this.uploadHasBeenClicked && this.loading ? "Loading" : "Find this book"}}</button>
      </form>
      <section class="list" v-if="this.bookToSell.title">
        <h4 class="list--title h4">{{ this.bookToSell.title }}</h4>
        <p class="list--info">{{ this.bookToSell.authors[0] }}</p>
        <img class="imgPreview" :src="this.bookToSell.imageLinks.thumbnail" />
        <p class="list--subtext">
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
          <button
            class="upload--form-btn btn"
          >{{this.listHasBeenClicked && this.loading ? "Loading" : "List this book"}}</button>
        </form>

        <section class="list--conditionals" v-if="this.listHasBeenClicked && this.error">
          <p class="list--subtext">Something went wrong when listing your book</p>
        </section>
        <section
          class="list--conditionals"
          v-if="this.uploadHasBeenClicked && this.error && !this.loading"
        >
          <p class="list--subtext">Sorry, we can't find this book!</p>
        </section>
      </section>
    </section>
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
      sellingBooksImages: [],
      loading: true,
      listHasBeenClicked: false,
      deletedBooks: [],
      success: false,
      deleted: false
    };
  },
  beforeCreate() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.user = user;
      })
      .catch(err => {
        console.log(err, "err in currentAuthenticatedUser");
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
      Auth.currentUserInfo()
        .then(currentUser => {
          this.username = currentUser.username;
          // this.fetchPurchasedBooks();
          this.fetchSellingBooks();
        })
        .catch(err => {
          console.log(err, "err in getUserAttributes");
        });
    },
    fetchPurchasedBooks() {
      api
        .getPurchasedBooks(this.username)
        .then(books => {
          if (books.Purchased) {
            this.error = false;
            this.purchasedBooks = books.Purchased;
            this.fetchUsersBooksImages(
              this.purchasedBooks,
              this.purchasedBooksImages
            );
          } else {
            this.loading = false;
          }
        })
        .catch(err => {
          this.error = true;
          this.loading = false;
          console.log(err, "< err in fetchPurchasedBooks");
        });
    },
    fetchSellingBooks() {
      api
        .getSellingBooks(this.username)
        .then(books => {
          if (books.Selling) {
            this.loading = false;
            this.error = false;
            this.sellingBooks = books.Selling;
            this.fetchUsersBooksImages(
              this.sellingBooks,
              this.sellingBooksImages
            );
          } else {
            this.loading = false;
          }
        })
        .catch(err => {
          this.error = true;
          this.loading = false;
          console.log(err, "< err in fetchSellingBooks");
        });
    },
    fetchUsersBooksImages(collection, collectionImages) {
      for (let book of collection) {
        api
          .getBookByTitle(book)
          .then(bookDetails => {
            this.loading = false;
            this.error = false;
            if (
              !collectionImages.filter(
                obj =>
                  obj.img ===
                  bookDetails.items[0].volumeInfo.imageLinks.thumbnail
              ).length
            ) {
              collectionImages.push({
                img: bookDetails.items[0].volumeInfo.imageLinks.thumbnail,
                title: bookDetails.items[0].volumeInfo.title
              });
            }
          })
          .catch(err => {
            this.error = true;
            this.loading = false;
            console.log(err, "< err in fetchUsersBooksImages()");
          });
      }
    },
    checkPostcode() {
      this.loading = true;
      this.listHasBeenClicked = true;
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
        .catch(err => {
          this.error = true;
          this.loading = false;
          console.log(err, "< err in checkPostcode");
        });
    },
    fetchBookToUpload() {
      let title = this.uploadForm.inputTitle;
      let author = this.uploadForm.inputAuthor;
      this.uploadHasBeenClicked = true;
      this.loading = true;
      return api
        .getBookToUpload(title, author)
        .then(book => {
          if (book.items[0]) {
            this.error = false;
            this.loading = false;
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
          this.loading = false;
          console.log(err, "< err in fetchBookToUpload");
        });
    },
    listBook() {
      let sellingBookArr = [this.bookToSell.title];
      return api
        .updateSellingBooks(this.username, sellingBookArr)
        .then(() => {
          this.loading = false;
          this.error = false;
          this.success = true;
          this.bookToSell = {};
          this.fetchSellingBooks();
        })
        .catch(err => {
          this.error = true;
          this.loading = false;
          console.log(err, "err in listBook");
        });
    },
    deleteBook(e) {
      let bookToDelete = e.target.parentElement.id;
      console.log(bookToDelete, "booktoDelete");
      let longer;
      let shorter;

      for (let title of this.sellingBooks) {
        if (title.toLowerCase() === bookToDelete.toLowerCase()) {
          return this.removeBookFromDb(title);
        }

        if (title.length > bookToDelete) {
          longer = title;
          shorter = bookToDelete;
        } else {
          longer = bookToDelete;
          shorter = title;
        }

        if (longer.includes(shorter)) {
          return this.removeBookFromDb(title);
        }
      }
    },
    removeBookFromDb(bookTitle) {
      return api
        .deleteFromCollection(this.username, bookTitle, "Selling")
        .then(data => {
          console.log("deleted.");
          this.deleted = true;
        })
        .catch(err => {
          console.log(err, "err in deleteBook");
        });
    }
  },
  mounted() {
    this.getUserAttributes();
  }
};
</script>

<style>
.userStatus {
  border-top: 1px solid var(--pink-color);
  border-bottom: 1px solid var(--pink-color);
  padding-bottom: 20px;
}

.bookshelves {
  margin: 0 auto;
}

.upload {
  border-top: 1px solid var(--pink-color);
  margin: 1rem 0 4rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.upload--info li {
  line-height: 1.4rem;
  text-align: left;
  padding: 8px 0;
}

.upload--form-input {
  margin: 8px 0;
}

.list {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.list--info {
  text-transform: uppercase;
}

.list--subtext {
  font-size: 0.9rem;
  line-height: 1.4rem;
}

.list--conditionals {
  margin-top: 4rem;
}
@media (min-width: 425px) {
  .list {
    margin-top: 6rem;
  }
}

@media (min-width: 768px) {
  .userStatus {
    margin: 1rem 0;
  }

  .list {
    margin-top: 8rem;
  }
}

@media (min-width: 1024px) {
  .upload {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  .upload--form {
    width: 70%;
    margin: 0 auto;
  }
}
</style>
