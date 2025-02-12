<template>
  <div>
    <h2 class="text-3xl font-bold underline">Dashboard</h2>
    <p v-if="userEmail">Welcome, {{ userEmail }}!</p>
    <p v-else>Loading user data...</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userEmail: '',
    };
  },
  mounted() {
    // Fetch user email from localStorage (mock authentication)
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.$router.push('/login'); // Redirect if not logged in
    } else {
      this.userEmail = localStorage.getItem('userEmail') || 'User'; // Mock user email
    }
  },
  methods: {
    logout() {
      // Clear authentication data
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');

      // Redirect to login page
      this.$router.push('/login');
    },
  },
};
</script>
