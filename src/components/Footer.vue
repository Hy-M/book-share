<template>
  <footer class="footer">
    <p>Shook &copy; 2020</p>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style>
.footer {
  margin: 9rem 0 1rem 0;
}

@media (min-width: 768px) {
  .footer {
    margin-top: 11rem;
  }
}

@media (min-width: 1024px) {
  .footer {
    margin-top: 15rem;
  }
}
</style>
