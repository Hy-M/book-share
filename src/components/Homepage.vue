<template>
  <div>
    <section>
      <form>
        <input type="text" placeholder="Enter a title, author or keyword" />
        <button>Search</button>
      </form>
      <h2>Browse available books nearby</h2>
    </section>
    <AvailableBooks />
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
