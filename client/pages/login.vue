<template>
  <div class="flex flex-col md:flex-row h-screen">
    <!-- Left Side: Image Section -->
    <div class="hidden md:flex w-full md:w-3/5 bg-blue-600 items-center justify-center p-10 text-white relative shadow-lg bg-login ">
    </div>

    <!-- Right Side: Login Form -->
    <div class="w-full md:w-2/5 flex flex-col items-center justify-center px-6 md:px-20 py-10">
      <div class="w-full bg-white p-8 rounded-lg ">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">Login</h2>
        <p class="text-blue-900 text-md mb-4 font-bold text-center md:text-left">Login to your account</p>
        <p class="text-gray-600 text-center text-sm md:text-left mb-6">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere fugiat aliquid nam deserunt hic aperiam? Sequi itaque quae.
        </p>

        <form @submit.prevent="login" class="space-y-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
            <input v-model="email" id="email" type="email" required class="w-full p-3 border rounded-md shadow-sm focus:ring focus:ring-blue-300" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
            <input v-model="password" id="password" type="password" required class="w-full p-3 border rounded-md shadow-sm focus:ring focus:ring-blue-300" />
          </div>
          
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input type="checkbox" id="remember" class="mr-2">
              <label for="remember" class="text-gray-600 text-sm">Remember me</label>
            </div>
            <a href="#" class="text-blue-600 hover:underline text-sm">Reset Password?</a>
          </div>

          <button type="submit" class="bg-blue-600 text-white py-3 px-12 rounded-md hover:bg-blue-700 transition shadow-md mt-6 flex items-center justify-center" :disabled="loading">
            <svg v-if="loading" class="mr-3 size-5 animate-spin" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span>{{ loading ? 'Processing…' : 'Sign In' }}</span>
          </button>
        </form>

        <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
        <p v-if="success" class="text-green-500 text-center mt-4">{{ success }}</p>

        <p class="mt-4 text-gray-600 text-start">
          Don't have an account yet? 
          <NuxtLink to="/register" class="text-blue-600 hover:underline">Sign Up</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '~/stores/auth';

definePageMeta({ layout: 'auth' });

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      success: '',
      loading: false,
      authStore: useAuthStore(),
    };
  },
  methods: {
    async login() {
      try {
        this.error = '';
        this.success = '';
        this.loading = true;
        
        await this.authStore.login({ email: this.email, password: this.password });
        this.success = 'Login successful!';
        this.$router.push('/dashboard'); // Redirect after login
      } catch (error) {
        this.error = error.message || 'Login failed. Please try again.';
      } finally {
        this.loading = false;
      }
    },  
  },
};
</script>

<style>
/* .bg-login {
  background-image: url('../assets/images/register.jpg');
  background-size: cover;
  background-position: center;
} */
</style>
