<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="error" style="color: red;">{{ error }}</p>
    <p v-if="success" style="color: green;">{{ success }}</p>
  </div>
</template>

<script>
import { useApi } from '~/composables/useApi'; // Import API composable

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      success: '',
    };
  },
  methods: {
    async login() {
      try {
        this.error = '';
        this.success = '';

        // Use `useApi` for API call
        const { data, error } = await useApi('login', {
          method: 'POST',
          body: {
            email: this.email,
            password: this.password,
          },
        });

        // Handle errors
        if (error.value) {
          this.error = error.value.data?.message || 'Login failed. Please try again.';
          return;
        }

        // Handle success
        if (data.value) {
          this.success = 'Login successful!';
          console.log('User logged in:', data.value);

          // Store token in localStorage or cookies (optional)
          localStorage.setItem('authToken', data.value.token);

          // Optionally, redirect user to dashboard
          this.$router.push('/dashboard');
        }
      } catch (err) {
        this.error = 'An unexpected error occurred. Please try again.';
        console.error('Login error:', err);
      }
    },
  },
};
</script>
