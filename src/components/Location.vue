<template v-if="noLocation">
  <h2 class="text-center">
    Enable geolocation to see available books near you
  </h2>
</template>

<script>
export default {
  data() {
    return {
      noLocation: true,
      coordinates: {},
    };
  },
  beforeMount() {
    this.getLocation();
  },
  methods: {
    async getLocation() {
      try {
        const coordinates = await this.$getLocation({
          enableHighAccuracy: true,
        });
        this.coordinates = coordinates;
        console.log(coordinates);
        this.noLocation = false;
      } catch (error) {
        this.noLocation = true;
      }
    },
  },
};
</script>

<style></style>
