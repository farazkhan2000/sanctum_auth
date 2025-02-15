
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/google-fonts'
  ],
  css : ['~/assets/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  googleFonts: {
    families: {
      'Lato': [300, 400, 700],
      'Oswald': [200, 300, 400, 500, 600, 700],
    },
    display: 'swap',
    preconnect: true,
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://127.0.0.1:8000/api', // Replace with your actual API URL
    },
  },
})
