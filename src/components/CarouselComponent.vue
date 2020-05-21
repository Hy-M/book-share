<template>
  <carousel
    :perPageCustom="[
      [320, 1],
      [768, 3],
      [1024, 4]
    ]"
    :autoplay="true"
    :autoplayHoverPause="true"
    :paginationColor="'var(--grey-color)'"
    :paginationActiveColor="'#d65a85'"
  >
    <slide v-for="image in images" :key="image">
      <img class="imgPreview" :src="image" />
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  components: { Carousel, Slide },
  props: {
    images: {
      type: Array
    }
  },
  data() {
    return {
      slides: [
        {
          imgUrl:
            "https://marketplace.canva.com/EADanktU9AE/1/0/251w/canva-green-beach-photo-book-cover-o2wPCwYqW2w.jpg",
          id: "1",
          title: "The sun in his eyes"
        },
        {
          imgUrl:
            "https://marketplace.canva.com/EADaiDo2aSo/1/0/251w/canva-yellow-lemon-children-book-cover-Fb1rBcVIu2U.jpg",
          id: "2",
          title: "The happy lemon"
        },
        {
          imgUrl:
            "https://external-preview.redd.it/Y7aBLF2UAb8iDEl4v9nXSn_-RB7BolZFjneuOhAu1f0.jpg?auto=webp&s=0423b4b424bf8d4ffc6a857e4258bc49bd97098a",
          id: "3",
          title: "The great gatsby"
        }
      ]
    };
  },
  mounted() {}
};
</script>

<style></style>
