<template>
  <div class="font-lato">
    <header>
      <Navbar />
    </header>
    <main>
      <slot />
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
