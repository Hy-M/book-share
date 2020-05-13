<template>
  <carousel :perPage="3">
    <slide>slide1</slide>
    <slide>slide2</slide>
    <slide>slide3</slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  components: { Carousel, Slide }
};
</script>

<style></style>
