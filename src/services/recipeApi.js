import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/recipes`;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Recipe Search & Discovery
export const searchRecipes = async (params) => {
  console.log('=== FRONTEND DEBUG - searchRecipes START ===');
  console.log('Frontend API call params:', params);
  console.log('API_BASE_URL:', API_BASE_URL);
  console.log('Full URL will be:', `${API_BASE_URL}/search`);
  
  try {
    const response = await api.get('/search', { params });
    console.log('Frontend API response status:', response.status);
    console.log('Frontend API response data:', response.data);
    console.log('=== FRONTEND DEBUG - searchRecipes SUCCESS ===');
    return response.data;
  } catch (error) {
    console.log('=== FRONTEND DEBUG - searchRecipes ERROR ===');
    console.log('Frontend API error:', error);
    console.log('Error response status:', error.response?.status);
    console.log('Error response data:', error.response?.data);
    console.log('Error message:', error.message);
    console.log('=== FRONTEND DEBUG - searchRecipes ERROR END ===');
    throw error;
  }
};

export const getRandomRecipes = async (params) => {
  console.log('=== FRONTEND DEBUG - getRandomRecipes START ===');
  console.log('Frontend API call params:', params);
  
  try {
    const response = await api.get('/random', { params });
    console.log('Frontend API response status:', response.status);
    console.log('Frontend API response data keys:', Object.keys(response.data || {}));
    console.log('=== FRONTEND DEBUG - getRandomRecipes SUCCESS ===');
    return response.data;
  } catch (error) {
    console.log('=== FRONTEND DEBUG - getRandomRecipes ERROR ===');
    console.log('Frontend API error:', error);
    console.log('Error response status:', error.response?.status);
    console.log('Error response data:', error.response?.data);
    console.log('=== FRONTEND DEBUG - getRandomRecipes ERROR END ===');
    throw error;
  }
};

export const findRecipesByIngredients = async (params) => {
  const response = await api.get('/find-by-ingredients', { params });
  return response.data;
};

export const searchFoodVideos = async (params) => {
  const response = await api.get('/videos', { params });
  return response.data;
};

// Recipe Details
export const getRecipeById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const getSimilarRecipes = async (id, params) => {
  const response = await api.get(`/${id}/similar`, { params });
  return response.data;
};

export const getRecipeNutrition = async (id) => {
  const response = await api.get(`/${id}/nutrition`);
  return response.data;
};

export const getRecipePriceBreakdown = async (id) => {
  const response = await api.get(`/${id}/price-breakdown`);
  return response.data;
};

export const getRecipeInstructions = async (id) => {
  const response = await api.get(`/${id}/instructions`);
  return response.data;
};

// Meal Planning
export const generateMealPlan = async (params) => {
  const response = await api.get('/meal-plan/generate', { params });
  return response.data;
};

// Wine & Food Pairing
export const getWinePairing = async (params) => {
  const response = await api.get('/wine/pairing', { params });
  return response.data;
};

// Nutrition Analysis
export const analyzeRecipeNutrition = async (data) => {
  const response = await api.post('/analyze-nutrition', data);
  return response.data;
};

export default {
  searchRecipes,
  getRandomRecipes,
  findRecipesByIngredients,
  searchFoodVideos,
  getRecipeById,
  getSimilarRecipes,
  getRecipeNutrition,
  getRecipePriceBreakdown,
  getRecipeInstructions,
  generateMealPlan,
  getWinePairing,
  analyzeRecipeNutrition
};