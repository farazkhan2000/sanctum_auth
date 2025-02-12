<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="name" type="text" placeholder="Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <input v-model="password_confirmation" type="password" placeholder="Confirm Password" required />
      <button type="submit">Register</button>
    </form>
    <p v-if="error" style="color: red;">{{ error }}</p>
    <p v-if="success" style="color: green;">{{ success }}</p>
  </div>
</template>

<script>
import { useApi } from '~/composables/useApi'; // Import the composable

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      error: '',
      success: '',
    };
  },
  methods: {
    async register() {
      try {
        this.error = '';
        this.success = '';

        // Use `useApi` instead of `useFetch`
        const { data, error } = await useApi('register', {
          method: 'POST',
          body: {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
          },
        });

        // Handle errors
        if (error.value) {
          this.error = error.value.data?.message || 'Registration failed. Please try again.';
          return;
        }

        // Handle success
        if (data.value) {
          this.success = 'Registration successful!';
          console.log('User registered:', data.value);

          // Optionally, redirect the user
          // this.$router.push('/login');
        }
      } catch (err) {
        this.error = 'An unexpected error occurred. Please try again.';
        console.error('Registration error:', err);
      }
    },
  },
};
</script>
