export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $axios } = useNuxtApp();

  try {
    const response = await $axios.get('/user');
    
    if (!response.data) {
      return navigateTo('/login'); // Redirect if user is not authenticated
    }
  } catch (error) {
    return navigateTo('/login'); // Redirect to login on error
  }
});
  