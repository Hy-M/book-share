<template>
  <div>
    <main class="availableBooks">
      <h3 class="availableBooks--h3 h3">Browse books for sharing near you</h3>
      <div class="availableBooks--book" v-for="book in availableBooks" v-bind:key="book.id">
        {{ path = `/home/${book.id}`}}
        <router-link :to="path">
          <img class="availableBooks--book-img" :src="book.img" />

          <h4 class="availableBooks--book-h4">{{book.title.toUpperCase()}}</h4>
        </router-link>
        <p class="availableBooks--book-info">{{book.author.toUpperCase()}}</p>
        <p class="availableBooks--book-info">{{book.distance.toUpperCase()}}</p>
      </div>
    </main>
  </div>
</template>

<script>
const booksData = require("../data.json");

export default {
  data() {
    return {
      availableBooks: booksData
    };
  }
};
</script>

<style>
.availableBooks {
  width: 95%;
  margin: 2rem auto 0 auto;
}

.availableBooks--book {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem 0;
}

.availableBooks--book-img {
  height: 250px;
  width: 200px;
  border-radius: 8px;
}

.availableBooks--book-h4 {
  text-decoration: none;
  color: var(--pink-color);
}

.availableBooks--book-h4,
.availableBooks--book-info {
  margin: 0.3rem;
}
</style>