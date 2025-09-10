export const setupInterceptors = (apiInstance) => {
  // Request interceptor to add auth token
  apiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.error('No token found in localStorage');
        window.location.href = '/login';
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to handle errors
  apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};