<template v-if="noLocation">
  <h2 class="text-center">
    Enable geolocation to see available books near you
  </h2>
</template>

<script>
import * as api from "../api";
import { Auth } from "aws-amplify";
import { AmplifyEventBus } from "aws-amplify-vue";
export default {
  data() {
    return {
      noLocation: true,
      coordinates: {},
      postcode: "",
      username: "",
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
        this.coordinates = {
          latitude: coordinates.lat,
          longitude: coordinates.lng,
        };
        return api
          .getPostcodeByCoords(
            this.coordinates.latitude,
            this.coordinates.longitude
          )
          .then((postcode) => {
            console.log(postcode, "<--from google maps api");
            this.getCurrentUser();
            this.noLocation = false;
          });
      } catch (error) {
        this.noLocation = true;
      }
    },
    getCurrentUser() {
      Auth.currentUserInfo().then((currentUser) => {
        this.username = currentUser.username;
        //   return api.updateUserDetails(this.username).then((data) => {
        //     console.log(data);
        //   });
        // })
        // .catch((err) => {
        //   console.log(err, "err in getUserAttributes");
      });
    },
  },
  mounted() {
    this.getCurrentUser();
  },
};
</script>

<style></style>
