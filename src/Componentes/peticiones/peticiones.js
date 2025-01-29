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
    throw error.response ? error.response.data : error.message; 
  }
};


export const obtenerTipos = async () => {
  try {
    const response = await apiClient.get('/producto/tipo/obtener');
    return response.data; 
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};



export const obtenerProductos = async (idTipo = null, buscar = 1) => {
    try {
      const url = `/inventario/obteneridTipo=${idTipo || ''}&buscar=${buscar}`;
      
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  };
  
