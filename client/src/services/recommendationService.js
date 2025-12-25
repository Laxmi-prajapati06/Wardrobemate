import API from '../utils/api';

// Fetch user preferences (Body Type & Skin Tone)
export const getUserPreferences = async (userId) => {
  try {
    const response = await API.get(`/users/${userId}/preferences`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return {
      bodyType: null,
      skinTone: null,
      hasBodyData: false,
      hasSkinData: false
    };
  }
};

// Fetch Recommendations from Backend Database
export const getOutfitRecommendations = async (userId, occasion) => {
  try {
    // Now we pass the occasion to the backend, which handles the logic
    const response = await API.get('/outfits/recommendations', {
      params: { occasion }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching outfit recommendations:', error);
    return [];
  }
};

// Fetch Saved Outfits from Backend Database
export const getSavedRecommendations = async (userId) => {
  try {
    const response = await API.get('/outfits/saved');
    // The backend now returns the full outfit objects, so we just return the data
    return response.data;
  } catch (error) {
    console.error('Error fetching saved recommendations:', error);
    return [];
  }
};

// Save an outfit
export const saveRecommendation = async (userId, outfitId) => {
  try {
    const response = await API.post(`/outfits/save`, { outfitId });
    return response.data;
  } catch (error) {
    console.error('Error saving recommendation:', error);
    throw error;
  }
};

// Remove a saved outfit
export const removeSavedRecommendation = async (userId, outfitId) => {
  try {
    const response = await API.delete(`/outfits/saved/${outfitId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing saved recommendation:', error);
    throw error;
  }
};

// Helper to get stats (optional, fetches from backend if needed in future)
export const getOccasionStats = () => {
  return {}; // Placeholder as logic is now server-side
};