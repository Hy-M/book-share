<template>
  <!-- <main class="main"> -->
  <div class="availableBooks--book">
    <router-link :to="`/browse/${book.user}/${book.bookDetails.title}`">
      <img
        class="availableBooks--book-img imgPreview"
        :src="this.currentImage || this.defaultImage"
      />
      <h4 class="availableBooks--book-h4 book--title">{{ book.bookDetails.title }}</h4>
    </router-link>
    <p class="availableBooks--book-info book--author">{{ book.bookDetails.authors[0] }}</p>

    <!-- <p class="availableBooks--book-info book--subText">
        Distance: {{ book.distance || "Unknown" }}
    </p>-->
  </div>
  <!-- </main> -->
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
      return api
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
.availableBooks--book {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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
  .availableBooks--book {
    /* width: 91vw; */
  }
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
  .availableBooks--book {
    /* width: 73.5vw; */
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
  .availableBooks--book {
    width: 59vw;
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
