import API from '../utils/api';

export const authService = {
  async login(email, password) {
    const response = await API.post('/auth/login', { email, password });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  },

  async register(userData) {
    const response = await API.post('/auth/register', userData);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  },

  async logout() {
    try {
      // Only try to call logout endpoint if we have a token
      const token = localStorage.getItem('token');
      if (token) {
        await API.post('/auth/logout');
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      localStorage.removeItem('token');
    }
  },

  async getCurrentUser() {
    const token = localStorage.getItem('token');
    
    // Don't make API call if no token exists
    if (!token) {
      return null;
    }

    try {
      const response = await API.get('/users/me');
      return response.data;
    } catch (error) {
      // If we get 401, clear the invalid token
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
      }
      throw error;
    }
  }
};