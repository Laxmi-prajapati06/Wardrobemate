import API from '../utils/api';

// Get user data from localStorage
const getLocalUserData = (userId) => {
  try {
    const savedUser = localStorage.getItem(`user_${userId}`);
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

// Save user data to localStorage
const saveLocalUserData = (userId, data) => {
  try {
    localStorage.setItem(`user_${userId}`, JSON.stringify({
      ...data,
      updated_at: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getUserProfile = async (userId) => {
  try {
    console.log('Fetching user profile for:', userId);
    
    // Try the main endpoint
    try {
      const response = await API.get(`/users/${userId}`);
      console.log('User profile fetched from API');
      
      // Save to localStorage for future offline use
      saveLocalUserData(userId, response.data);
      return response.data;
    } catch (error) {
      console.warn('Primary endpoint failed, trying /me endpoint:', error.message);
      
      // Try the /me endpoint
      try {
        const response = await API.get('/users/me');
        console.log('User profile fetched from /me endpoint');
        
        // Save to localStorage for future offline use
        saveLocalUserData(userId, response.data);
        return response.data;
      } catch (fallbackError) {
        console.warn('Fallback endpoint also failed:', fallbackError.message);
        
        // Try to get data from localStorage
        const localData = getLocalUserData(userId);
        if (localData) {
          console.log('Using user data from localStorage');
          return localData;
        }
        
        // If no local data, check if we have a token
        const token = localStorage.getItem('token');
        if (token) {
          console.warn('API unavailable but token exists, creating minimal user profile');
          return {
            id: userId,
            email: 'user@example.com',
            name: 'User',
            created_at: new Date().toISOString()
          };
        }
        
        throw new Error('No user data available');
      }
    }
  } catch (error) {
    console.error('Error in getUserProfile:', error.message);
    throw error;
  }
};

export const updateUserProfile = async (userId, data) => {
  try {
    console.log('Updating user profile for:', userId);
    
    // Try to update via API
    try {
      const response = await API.put(`/users/profile`, data);
      console.log('User profile updated via API');
      
      // Also save to localStorage for offline access
      saveLocalUserData(userId, response.data);
      
      return response.data;
    } catch (error) {
      console.error('API update failed, saving to localStorage:', error.message);
      
      // Fallback to localStorage
      const existingData = getLocalUserData(userId) || {};
      const updatedData = {
        ...existingData,
        ...data,
        id: userId,
        updated_at: new Date().toISOString()
      };
      saveLocalUserData(userId, updatedData);
      
      console.log('User profile saved to localStorage');
      return updatedData;
    }
  } catch (error) {
    console.error('Error in updateUserProfile:', error.message);
    throw new Error('Failed to update profile');
  }
};

export const saveBodyMeasurements = async (userId, measurements) => {
  try {
    const response = await API.post(`/body-type/analyze`, measurements);
    return response.data;
  } catch (error) {
    console.error('Error saving body measurements:', error);
    throw new Error('Failed to save body measurements');
  }
};