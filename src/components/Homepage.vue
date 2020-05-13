<template>
  <div>
    <section id="searchBar">
      <form class="searchBar--form" v-on:submit.prevent="fetchBooksByInput">
        <input
          class="searchBar--form-input"
          type="text"
          placeholder="Enter a title or author"
          v-model="searchForm.input"
        />
        <button class="searchBar--form-btn">Search</button>
      </form>
    </section>
    <AvailableBooks />
    <router-link to="/profile">
      <h3 class="availableBooks--h3">Got a spare book lying around?</h3>
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
      }
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

.searchBar--form {
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.searchBar--form-input {
  padding: 10px;
  border-radius: 8px;
  box-shadow: none;
  text-shadow: none;
  width: 95%;
  outline-color: var(--pink-color);
}

.searchBar--form-btn {
  border-radius: 8px;
  padding: 4px 0;
  width: 50%;
  background-color: transparent;
  border: 1px solid var(--pink-color);
  box-shadow: 1px 1px 3px var(--grey-color);
  outline-color: var(--pink-color);
}
</style>
