// src/services/AuthService.js
const AuthService = {
    login(user) {
      localStorage.setItem('user', JSON.stringify(user));
    },
  
    logout() {
      localStorage.removeItem('user');
    },
  
    register(user) {
      localStorage.setItem('user', JSON.stringify(user));
    },
  
    getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));
    }
  };
  
  export default AuthService;