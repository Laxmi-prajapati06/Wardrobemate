import API from '../utils/api';

export const analyzeSkinTone = async (userId, imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('userId', userId);

  try {
    console.log('Uploading image for analysis...');
    const response = await API.post('/skin-tone/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      // Add timeout and onUploadProgress for better UX
      timeout: 30000,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload progress: ${percentCompleted}%`);
      }
    });
    
    console.log('Analysis successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error analyzing skin tone:', error);
    
    // Provide more specific error messages
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Server response error:', error.response.status, error.response.data);
      throw new Error(error.response.data.error || 'Server error during analysis');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Something happened in setting up the request
      console.error('Request setup error:', error.message);
      throw new Error('Failed to analyze image. Please try again.');
    }
  }
};