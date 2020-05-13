<template>
  <main>
    <section class="userStatus">
      <p class="userStatus--status">Hello, user 1</p>
      <button class="user--btn btn">Log out</button>
    </section>

    <section class="bookshelves">
      <h4 class="h4">My bookshelf</h4>
      <p>a carousel of books</p>
      <CarouselComponent />
      <h4 class="h4">Books i'm giving away</h4>
      <p>A carousel of books</p>
    </section>

    <section class="upload">
      <h3 class="h3">Got a spare book lying around?</h3>
      <p class="upload--info">
        1) Search for your book
        <br />2) Select the right option <br />3) Upload it for others to use
      </p>
      <form class="upload--form form">
        <input
          class="upload--form-input input"
          placeholder="enter book title or author"
        />
        <button class="upload--form-btn btn">Search</button>
      </form>
    </section>

    <!-- <ul>
      <li>each book result from the api would go here</li>
      <button>Add this book to give away</button>
      <li>each book result from the api would go here</li>
      <button>Add this book to give away</button>
      <li>each book result from the api would go here</li>
      <button>Add this book to give away</button>
    </ul>-->
  </main>
</template>

<script>
import CarouselComponent from "./CarouselComponent.vue";
export default {
  components: {
    CarouselComponent
  },
  data() {
    return {
      uploadForm: {
        input: ""
      },
      books: []
    };
  },
  methods: {
    fetchBookToUpload() {}
  }
};
</script>

<style>
main {
  width: 95%;
  margin: 0 auto;
}

.userStatus {
  border-top: 1px solid var(--pink-color);
  border-bottom: 1px solid var(--pink-color);
  padding-bottom: 20px;
}
.upload--info {
  line-height: 1.5rem;
  text-align: left;
}
</style>
