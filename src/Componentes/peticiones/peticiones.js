import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://bioclinics-backend-production.up.railway.app', 
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

export const agregarProducto = async (producto) => {
    try {
      const response = await apiClient.post('/inventario/agregar/producto/nuevo', producto);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  };
  

export const obtenerProductos = async (idTipo = null, buscar = '', pagina = 1) => {
    try {
      let url = `/inventario/obtener?pagina=${pagina}`;  // Aseguramos que siempre se pase el parámetro 'pagina'
  
      // Construimos la URL manualmente si hay parámetros adicionales
      if (idTipo || buscar) {
        if (idTipo) url += `&idTipo=${idTipo}`;
        if (buscar) url += `&buscar=${buscar}`;
      }
  
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  };
  
  export const eliminarProducto = async (idProducto) => {
    try {
      const response = await apiClient.delete(`/inventario/eliminar/${idProducto}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  };
  export const actualizarProducto = async (producto) => {
    try {
      const response = await apiClient.put('/producto/editar', { ...producto });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  };
  export const obtenerInterno = async () => {
    try {
      const response = await apiClient.get('/interno/obtener');
      return response.data; 
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  };


export const agregarInterno = async (interno) => {
  try {
    const response = await apiClient.post('/interno/agregar', {...interno});
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const actualizarInterno = async (id, datosActualizados) => {
  try {
    const response = await apiClient.put(`/interno/actualizar/${id}`, datosActualizados);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const eliminarInterno = async (id) => {
  try {
    const response = await apiClient.delete(`/interno/eliminar/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};