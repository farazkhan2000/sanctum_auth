<template>
  <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div>
      <NuxtLink to="/" class="text-xl font-bold">Logo</NuxtLink>
    </div>

    <div v-if="authStore.isAuthenticated">
      <span class="mr-4">Welcome, {{ authStore.user?.name }}!</span>
      <button @click="logout" class="bg-red-500 px-4 py-2 rounded hover:bg-red-700">
        Logout
      </button>
    </div>

    <div v-else>
      <NuxtLink to="/login" class="mr-4 hover:underline">Login</NuxtLink>
      <NuxtLink to="/register" class="hover:underline">Register</NuxtLink>
    </div>
  </nav>
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
