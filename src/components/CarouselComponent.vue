<template>
  <carousel
    :perPageCustom="[
      [320, 1],
      [768, 2],
      [1024, 3],
    ]"
    :autoplay="true"
    :autoplayHoverPause="true"
    :paginationColor="'var(--grey-color)'"
    :paginationActiveColor="'#d65a85'"
  >
    <slide v-for="obj in images" :key="obj.title" :id="obj.title">
      <img class="imgPreview" :src="obj.img" />
      <button class="carousel--delBtn btn" v-on:click="deleteBook">
        <i class="fas fa-trash"></i>
      </button>
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import * as api from "../api.js";

export default {
  components: { Carousel, Slide },
  props: {
    images: {
      type: Array,
    },
    username: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    deleteBook(e) {
      let bookToDelete = e.target.parentElement.id;
      api
        .deleteFromCollection(this.username, bookToDelete, this.status)
        .then((data) => {
          console.log(data, "<---array without deleted book");
        })
        .catch((err) => {
          console.log(err, "err in deleteBook");
        });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.carousel--delBtn {
  color: var(--brown-color);
}
</style>
