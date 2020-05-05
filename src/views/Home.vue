<template>
  <div>
    <Header />
    <Homepage />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Homepage from "@/components/Homepage.vue";

export default {
  name: "Home",
  components: {
    Header,
    Homepage
  }
};
</script>
