<template>
  <header>
    <img class="header--logo" src="../assets/shookLogo.gif" />
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
.header--logo {
  height: 250px;
  margin: -2rem 0 -2rem 0;
}
@media (min-width: 425px) {
  .header--logo {
    height: 300px;
    margin: -2.5rem 0 -3rem 0;
  }
}

@media (min-width: 1024px) {
  .header--logo {
    height: 400px;
  }
}
</style>
