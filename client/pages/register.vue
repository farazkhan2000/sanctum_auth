<template>
  <div>
    <h2>Register</h2>
    <input v-model="name" type="text" placeholder="Name" />
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="register">Register</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('/register', {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        alert('Registration successful! You can now log in.');
        console.log(response.data); // Check response
      } catch (error) {
        alert('Registration failed: ' + error.message);
        console.error(error);
      }
    },
  },
};
</script>
