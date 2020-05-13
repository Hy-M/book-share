<template>
  <div>
    <h2>Browse available books near you</h2>
    <main>
      <div v-for="book in availableBooks" v-bind:key="book.id">
        {{ path = `/home/${book.id}`}}
        <router-link :to="path">
          <img :src="book.img" />
          <p>book id: {{book.id}}</p>
          <h3>{{book.title}}</h3>
          <p>{{book.author}}</p>
          <p>{{book.distance}}</p>
        </router-link>
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