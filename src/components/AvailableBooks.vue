<template>
  <div>
    <h2>Browse available books near you</h2>
    <main>
      <div v-for="book in availableBooks" v-bind:key="book.id">
        <img :src="book.img" />
        <h3>{{book.title}}</h3>
        <p>{{book.author}}</p>
        <p>{{book.distance}}</p>
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
main {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
img {
  height: 250px;
}
</style>