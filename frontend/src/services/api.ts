import axios from 'axios';
import { Terms, Product } from '../types';

const BASE_URL = `${import.meta.env.VITE_API_URL}/api`

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// API service object
export const api = {
  // Terms endpoints
  getTerms: async (language: string): Promise<Terms[]> => {
    try {
      const response = await axiosInstance.get(`/terms/${language}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching terms:', error);
      throw error;
    }
  },

  // Products endpoints
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await axiosInstance.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  updateProduct: async (id: number, data: Partial<Product>): Promise<Product> => {
    try {
      const response = await axiosInstance.put(`/products/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  deleteProduct: async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/products/${id}`);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  createProduct: async (data: Omit<Product, 'id'>): Promise<Product> => {
    try {
      const response = await axiosInstance.post('/products', data);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      const response = await axiosInstance.get(`/products/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }
};

// Request interceptor for logging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error('Response error:', error.response.status, error.response.data);
      
      switch (error.response.status) {
        case 401:
          console.log('Unauthorized - redirecting to login');
          break;
        case 404:
          console.log('Resource not found');
          break;
        case 500:
          console.log('Server error - please try again later');
          break;
        default:
          console.log('An error occurred');
      }
    } else if (error.request) {
      // Request was made but no response
      console.error('Network error - no response received');
    } else {
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;