<template>
  <main>
    <section v-for="book in availableBooks" v-bind:key="book.id">
      <img :src="book.img" />
      <h3>{{book.title}}</h3>
      <p>{{book.author}}</p>
      <p>{{book.distance}}</p>
    </section>
  </main>
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
main {
  display: flex;
  justify-content: space-evenly;
}
img {
  height: 200px;
}
</style>