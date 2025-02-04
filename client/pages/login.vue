<template>
  <div>
    <h2>Login</h2>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const { $axios } = useNuxtApp();

        // Get CSRF Token before login
        const a = await $axios.get('/sanctum/csrf-cookie');
        console.log('a: ', a);

        // Perform login request
        const response = await $axios.post('/login', {
          email: this.email,
          password: this.password,
        });

        alert('Login successful!');
        console.log(response.data); // Check user data in console
      } catch (error) {
        alert('Login failed: ' + error.message);
        console.error(error);
      }
    },
  },
};
</script>
