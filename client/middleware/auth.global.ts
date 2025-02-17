export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  
  // Wait for session restoration before checking authentication
  if (!authStore.token) {
    await authStore.restoreSession();
  }

  const token = authStore.token;

  const publicPages = ['/login', '/register', '/'];
  const isPublicPage = publicPages.includes(to.path);

  if (!token && !isPublicPage) {
    return navigateTo('/login', { replace: true });
  }

  if (token && isPublicPage) {
    return navigateTo('/dashboard', { replace: true });
  }
});
