import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// ...existing code...

export const authUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error autenticando usuario:', error);
    throw error;
  }
};

// ...existing code...
