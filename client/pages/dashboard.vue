<template>
  <div>
    <h2>Welcome to the Dashboard</h2>
    <p>You are logged in.</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  middleware: 'auth', // Protect this page
  methods: {
    async logout() {
      try {
        // Make sure Axios uses the correct Laravel backend URL
        const api = axios.create({
          baseURL: 'http://localhost:8000', // Laravel backend
          withCredentials: true, // Allow cookies for session auth
        });

        // Ensure CSRF token is set before logging out
        await api.get('/sanctum/csrf-cookie');

        // Send logout request to Laravel
        await api.post('/logout');

        alert('Logged out successfully!');

        // Redirect to login page after logout
        this.$router.push('/login');
      } catch (error) {
        alert('Logout failed: ' + (error.response?.data?.message || error.message));
        console.error('Logout error:', error);
      }
    },
  },
};
</script>

<style scoped>
button {
  background-color: red;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 10px;
}
button:hover {
  background-color: darkred;
}
</style>
