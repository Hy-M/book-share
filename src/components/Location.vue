<template v-if="noLocation"> </template>

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
            this.postcode = postcode.features[0].text;
            this.getCurrentUser();
            this.noLocation = false;
          });
      } catch (error) {
        this.noLocation = true;
      }
    },
    getCurrentUser() {
      Auth.currentUserInfo()
        .then((currentUser) => {
          this.username = currentUser.username;
          api.updateUserDetails(this.username, this.postcode);
        })
        .catch((err) => {
          console.log(err, "err in getUserAttributes");
        });
    },
  },
  mounted() {
    this.getCurrentUser();
  },
};
</script>

<style></style>
