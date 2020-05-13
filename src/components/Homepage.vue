<template>
  <div>
    <section>
      <form>
        <input type="text" placeholder="Enter a title, author or keyword" />
        <button>Search</button>
      </form>
    </section>
    <AvailableBooks />
    <h2>Got a spare book lying around?</h2>
    <p>
      <router-link to="/profile">Click here</router-link>to list your books
    </p>
  </div>
</template>

<script>
import AvailableBooks from "@/components/AvailableBooks.vue";
export default {
  name: "Homepage",
  components: {
    AvailableBooks
  },
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
