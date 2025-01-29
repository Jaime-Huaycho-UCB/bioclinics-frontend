// api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json', 
  },
});


export const iniciarSesion = async (nombreUsuario, contrasena) => {
  try {
    const response = await apiClient.post('/usuario/iniciarSesion', {
      nombreUsuario,
      contrasena,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message; // Manejo del error
  }
};

