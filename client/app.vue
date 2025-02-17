<script setup>
import { useAuthStore } from '~/stores/auth';
import { ref } from 'vue';

const authStore = useAuthStore();
const isAuthChecked = ref(false);

onBeforeMount(async () => {
  await authStore.restoreSession();
  isAuthChecked.value = true;
});
</script>

<template>
  <div v-if="!isAuthChecked" class="flex items-center justify-center h-screen bg-gray-900">
    <Loader />
  </div>
  <div v-else>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
