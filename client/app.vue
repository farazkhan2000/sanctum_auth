<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

// Restore session when app loads
if (process.client) {
  authStore.restoreSession();
}
</script>