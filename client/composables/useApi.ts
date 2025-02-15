export const useApi = (endpoint: string, options: any = {}) => {
  const config = useRuntimeConfig();
  const token = process.client ? localStorage.getItem('authToken') : null;

  options.headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : '', 
  };

  return useFetch(`${config.public.apiBase}/${endpoint}`, options);
};

