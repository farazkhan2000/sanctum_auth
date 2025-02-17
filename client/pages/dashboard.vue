<template>
  <div>
    <h2 class="text-3xl font-bold underline">Dashboard</h2>
    <p v-if="authStore.user">Welcome, {{ authStore.user.name }}!</p>
    <p v-else>Error loading user data. Please try again.</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { useAuthStore } from '~/stores/auth';

export default {
  data() {
    return {
      authStore: useAuthStore(),
    };
  },
  methods: {
    async logout() {
      await this.authStore.logout();
    },
  },
};
</script>
