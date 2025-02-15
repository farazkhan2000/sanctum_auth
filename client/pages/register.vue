<template>
  <div class="flex flex-col md:flex-row h-screen">
    <!-- Left Side: Image/Info Section -->
    <div class="hidden lg:flex w-full md:w-1/3 bg-blue-600 items-center justify-center p-10 text-white relative bg-register ">
      <div class="max-w-sm text-center">
        <!-- <h2 class="text-3xl font-bold">A few clicks away from creating your Lottery Display</h2>
        <p class="mt-2 text-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p> -->
      </div>
    </div>

    <!-- Right Side: Registration Form -->
    <div class="w-full md:w-2/3 flex flex-col items-center justify-center px-6 md:px-32 py-10">
      <div class="w-5/6">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">Register</h2>
        <p class="text-blue-900 text-md mb-4 font-bold text-center md:text-left">Lorem ipsum dolor sit amet consectetur.</p>
        <p class="text-gray-600 text-center text-sm w-4/6 md:text-left mb-8">
          Iure autem cupiditate fuga quia. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure autem cupiditate fuga quia. 
        </p>

        <form @submit.prevent="register" class="">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="fullName">Full Name</label>
              <input v-model="name" id="fullName" type="text" required class="w-full p-3 border rounded-md" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
              <input v-model="email" id="email" type="email" required class="w-full p-3 border rounded-md" />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
              <input v-model="password" id="password" type="password" required class="w-full p-3 border rounded-md" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password_confirmation">Confirm Password</label>
              <input v-model="password_confirmation" id="password_confirmation" type="password" required class="w-full p-3 border rounded-md" />
            </div>
          </div>
          
          <div class="flex items-center space-x-2 mt-5">
            <input type="checkbox" id="terms" class="mr-2">
            <label for="terms" class="text-gray-600 text-sm">I agree to the <a href="#" class="text-blue-600 hover:underline">Terms, Privacy Policy</a> and Fees.</label>
          </div>

          <button type="submit" class="bg-blue-600 text-white py-3 px-12 rounded-md hover:bg-blue-700 transition shadow-md mt-6 flex items-center justify-center" :disabled="loading">
            <svg v-if="loading" class="mr-3 size-5 animate-spin" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span>{{ loading ? 'Signing Up...' : 'Sign Up' }}</span>
          </button>
        </form>

        <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
        <p v-if="success" class="text-green-500 text-center mt-4">{{ success }}</p>

        <p class="mt-2 text-gray-600">
          Already have an account? 
          <NuxtLink to="/login" class="text-blue-600 hover:underline">Log in</NuxtLink>
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
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      error: '',
      success: '',
      loading: false,
      authStore: useAuthStore(),
    };
  },
  methods: {
    async register() {
      try {
        this.error = '';
        this.success = '';
        this.loading = true;

        await this.authStore.register({
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        });

        this.success = 'Registration successful!';
        this.$router.push('/dashboard');
      } catch (err) {
        this.error = err.message || 'Registration failed. Please try again.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
/* .bg-register {
  background-image: url('../assets/images/register.jpg');
  background-size: cover;
  background-position: center;
} */
</style>