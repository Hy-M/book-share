<template>
  <div>
    <section id="searchBar">
      <!-- search dynamoDB to see if anyone is selling a book with the given title -->
      <form class="searchBar--form form" v-on:submit.prevent="fetchBooksByInput">
        <input
          class="searchBar--form-input input"
          type="text"
          placeholder="Enter a title to see if it's available"
          v-model="searchForm.input"
        />
        <button class="searchBar--form-btn btn">Search</button>
      </form>
    </section>
    <AvailableBooks />
    <router-link to="/profile">
      <h3 class="availableBooks--h3 h3">Got a spare book lying around?</h3>
    </router-link>
  </div>
</template>

<script>
import AvailableBooks from "@/components/AvailableBooks.vue";
import * as api from "@/api.js";
export default {
  name: "Homepage",
  components: {
    AvailableBooks
  },
  props: {},
  data() {
    return {
      searchForm: {
        input: ""
      },
      booksByInput: []
    };
  },
  methods: {
    fetchBooksByInput() {
      api.getBooksByInput(this.searchForm.input);
    }
  }
};
</script>

<style scoped>
#searchBar {
  width: 95%;
  margin: 0 auto;
}
</style>
