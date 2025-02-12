import tailwindcss from "@tailwindcss/vite";
import { resolve } from 'path';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  alias: {
    '@': resolve(__dirname, "/"),
  },
  css : ['~/assets/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://127.0.0.1:8000/api', // Replace with your actual API URL
    },
  },
})
