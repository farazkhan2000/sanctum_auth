export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem('authToken');

    // Define public pages (accessible without authentication)
    const publicPages = ['/login', '/register', '/'];
    const isPublicPage = publicPages.includes(to.path);

    // If not logged in and trying to access a protected route, redirect to login
    if (!token && !isPublicPage) {
      return navigateTo('/login');
    }

    // If logged in and trying to access a public page, redirect to dashboard
    if (token && isPublicPage) {
      return navigateTo('/dashboard');
    }
  }
});
