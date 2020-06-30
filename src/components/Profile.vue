<template>
  <main v-if="this.user.attributes" class="main">
    <section class="userStatus">
      <p class="userStatus--status">Hello, {{ this.user.attributes.email }}</p>
      <button v-on:click="signOut" class="user--btn btn">Log out</button>
    </section>
    <section class="bookshelves" id="Selling">
      <h4 class="h4">Books you're giving away</h4>
      <p class="list--subtext" v-if="!this.deleteHasBeenClicked && this.loading">Loading</p>
      <p
        class="list--subtext"
        v-if="!this.sellingBooks.length && !this.loading && this.noBooks"
      >You aren't selling any books yet</p>
      <p class="list--subtext" v-if="this.deleteHasBeenClicked && this.loading">Deleting</p>
      <CarouselComponent :images="this.sellingBooksImages" :deleteBook="this.deleteBook" />
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

        <button class="upload--form-btn btn">
          {{
          this.uploadHasBeenClicked && this.loading
          ? "Loading"
          : "Find this book"
          }}
        </button>
        <section
          class="list--conditionals"
          id="initial--conditional"
          v-if="this.uploadHasBeenClicked && this.error && !this.loading"
        >
          <p class="list--subtext">Sorry, we can't find this book!</p>
        </section>
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
          <button class="upload--form-btn btn">
            {{
            this.listHasBeenClicked && this.loading
            ? "Loading"
            : "List this book"
            }}
          </button>
        </form>
        <section
          class="list--conditionals"
          v-if="this.listHasBeenClicked && this.error && this.postcode !== 'invalid'"
        >
          <p class="list--subtext">Something went wrong when listing your book</p>
        </section>
        <section
          class="list--conditionals"
          v-if="this.listHasBeenClicked && this.error && this.postcode === 'invalid'"
        >
          <p class="list--subtext">Sorry, books can only be shared within the Kirklees area</p>
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
      postcode: "",
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
      noBooks: false,
      deleteHasBeenClicked: false
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
          if (currentUser.username) {
            this.username = currentUser.username;
            this.fetchSellingBooks();
          }
        })
        .catch(err => {
          console.log(err, "err in getUserAttributes");
        });
    },
    fetchSellingBooks() {
      return api
        .getSellingBooks(this.username)
        .then(books => {
          if (books.Selling) {
            this.loading = false;
            this.error = false;
            this.noBooks = false;
            this.sellingBooks = books.Selling;
            this.fetchUsersBooksImages(
              this.sellingBooks,
              this.sellingBooksImages
            );
          } else {
            this.noBooks = true;
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
            this.loading = false;
          }
        })
        .catch(err => {
          this.error = true;
          this.loading = false;
          console.log(err, "< err in fetchBookToUpload");
        });
    },
    checkPostcode() {
      this.loading = true;
      this.listHasBeenClicked = true;
      let finalPostcode = this.uploadForm.inputPostcode;
      return api
        .validatePostcode(finalPostcode)
        .then(({ result }) => {
          if (result) {
            if (result.admin_district === "Kirklees") {
              this.error = false;
              this.listBook(finalPostcode);
              this.uploadForm.inputPostcode = null;
            } else {
              this.loading = false;
              this.error = true;
              this.postcode = "invalid";
              this.uploadForm.inputPostcode = null;
            }
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
    listBook(validatedPostcode) {
      let sellingBookArr = [this.bookToSell.title];
      return api
        .updateSellingBooks(this.username, sellingBookArr)
        .then(() => {
          this.loading = false;
          this.error = false;
          this.success = true;
          this.bookToSell = {};
          this.fetchSellingBooks();
          return api.updateUserDetails(this.username, validatedPostcode);
        })
        .catch(err => {
          this.error = true;
          this.loading = false;
          console.log(err, "err in listBook");
        });
    },
    deleteBook(e) {
      this.deleteHasBeenClicked = true;
      this.loading = true;
      let bookToDelete = e.target.parentElement.id;
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
          this.loading = false;
          this.deleteHasBeenClicked = false;
          this.sellingBooksImages = this.sellingBooksImages.filter(
            obj => obj.title !== bookTitle
          );
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
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.upload--info li {
  line-height: 1.4rem;
  text-align: left;
  padding: 8px 0;
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

#initial--conditional {
  margin-top: -1rem;
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
    align-items: center;
  }
}
</style>
