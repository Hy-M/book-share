<template>
  <footer class="footer">
    <p>© 2020 Shook.</p>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style>
.footer {
  margin: 8rem 0 1rem 0;
}

@media (min-width: 768px) {
  .footer {
    margin-top: 9rem;
  }
}

@media (min-width: 1024px) {
  .footer {
    margin-top: 11rem;
  }
}
</style>
