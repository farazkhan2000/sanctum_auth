<template>
  <div class="font-lato">
    <header>
      <Navbar />
    </header>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>
