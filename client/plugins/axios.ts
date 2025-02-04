import axios from 'axios';

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: 'http://localhost:8000', // Ensure it's pointing to Laravel backend
    withCredentials: true, // Enable session authentication
  });

  return {
    provide: {
      axios: api,
    },
  };
});
