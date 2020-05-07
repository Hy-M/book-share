<template>
  <div>
    <main>
      <!-- <img/>  -->
      <h2>book title</h2>
      <p>BOOK ID: {{ $route.params.book_id}}</p>
      <p>here u make a get request for the book by the given book id and display the singleBook info</p>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>