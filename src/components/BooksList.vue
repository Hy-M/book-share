<template>
  <main class="main">
    <!-- <section>
      <h3 class="availableBooks--h3 h3">Browse books for sharing near you</h3>
      <p v-if="this.loading">Loading</p>
      <section class="availableBooks--all" v-if="this.availableBooks.length >= 1">
        <div
          class="availableBooks--book"
          v-for="(book, index) of availableBooks"
          v-bind:key="index"
        >
          <router-link :to="`/browse/${book.user}/${book.bookDetails.title}`">
            <img
              class="availableBooks--book-img imgPreview"
              :src="book.bookDetails.imageLinks.smallThumbnail"
            />
            <h4 class="availableBooks--book-h4 book--title">{{ book.bookDetails.title }}</h4>
          </router-link>
          <p class="availableBooks--book-info book--author">{{ book.bookDetails.authors[0] }}</p>

          <p
            class="availableBooks--book-info book--subText"
          >{{ book.address || "Distance unknown" }}</p>
        </div>
      </section>
      <section
        v-else-if="
            !this.loading && !this.error && !this.availableBooks.length
          "
      >
        <p>Sorry, we can't find any available books right now.</p>
      </section>
    </section>-->

    <div class="availableBooks--book">
      <router-link :to="`/browse/${book.user}/${book.bookDetails.title}`">
        <img
          class="availableBooks--book-img imgPreview"
          :src="this.currentImage || this.defaultImage"
        />
        <h4 class="availableBooks--book-h4 book--title">{{ book.bookDetails.title }}</h4>
      </router-link>
      <p class="availableBooks--book-info book--author">{{ book.bookDetails.authors[0] }}</p>

      <p class="availableBooks--book-info book--subText">Distance: {{ book.distance || "Unknown" }}</p>
    </div>
  </main>
</template>

<script>
import * as api from "../api";
export default {
  props: {
    availableBooks: {
      type: Array
    },
    book: {
      type: Object
    }
  },
  data() {
    return {
      loading: true,
      error: false,
      currentImage: "",
      defaultImage:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png"
    };
  },
  methods: {
    fetchImages() {
      api
        .getBookByTitle(this.book.bookDetails.title)
        .then(book => {
          this.currentImage =
            book.items[0].volumeInfo.imageLinks.smallThumbnail;
        })
        .catch(err => console.log(err, "err in fetchImages"));
    }
  },
  mounted() {
    this.fetchImages();
  }
};
</script>

<style>
</style>