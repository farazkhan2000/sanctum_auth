import { defineStore } from 'pinia';
import { useApi } from '~/composables/useApi';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),

  actions: {
    async login(credentials) {
      const { data, error } = await useApi('login', {
        method: 'POST',
        body: credentials,
      });

      if (error.value) {
        throw new Error(error.value.data?.message || 'Login failed');
      }

      if (data.value) {
        this.setUser(data.value.user, data.value.token);
      }
    },

    async fetchUser() {
      console.log('Fetching user data...');
      if (!this.token) {
        console.log("No token found. Fetch user aborted.");
        this.clearAuth();
        return;
      }

      try {
        const { data, error } = await useApi('user', { method: 'GET' });

        if (error.value) {
          console.error("Error fetching user:", error.value);
          this.clearAuth();
          return;
        }

        if (data.value) {
          this.user = data.value;
        }
      } catch (err) {
        console.error("Unexpected error in fetchUser:", err);
      }
    },

    async logout() {
      const { error } = await useApi('logout', { method: 'POST' });

      if (error.value) {
        console.error("Logout failed:", error.value);
        return;
      }

      this.clearAuth();
    },

    setUser(user, token) {
      this.user = user;
      this.token = token;

      // Store token in Pinia persistently (localStorage only on client)
      if (process.client) {
        localStorage.setItem('authToken', token);
      }
    },

    restoreSession() {
      // Restore token on page load (client-side only)
      if (process.client) {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
          this.token = storedToken;
          this.fetchUser(); // Fetch user data if token exists
        }
      }
    },

    clearAuth() {
      this.user = null;
      this.token = null;
      if (process.client) {
        localStorage.removeItem('authToken');
      }
      navigateTo('/login');
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
