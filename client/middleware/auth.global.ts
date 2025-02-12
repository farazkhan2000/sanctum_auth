export default defineNuxtRouteMiddleware((to, from) => {
  const token = process.client ? localStorage.getItem('authToken') : null;

  // Allow access to public pages like home, login, register
  const publicPages = ['/login', '/register', '/']; // Add more if needed
  if (!token && !publicPages.includes(to.path)) {
    return navigateTo('/login'); // Redirect to login if not authenticated
  }

  // Prevent logged-in users from accessing login page
  if (token && to.path === '/login') {
    return navigateTo('/dashboard'); // Redirect logged-in users to dashboard
  }
});
