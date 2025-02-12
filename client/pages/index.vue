<template>
  <div>
    <h1>Welcome to the Home Page</h1>
    <p>This page is publicly accessible before login.</p>
    <nuxt-link to="/login">Login</nuxt-link>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>
