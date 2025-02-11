import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { obtenerInterno,agregarInterno,actualizarInterno,eliminarInterno } from '../peticiones/peticiones'; // Asegúrate de importar correctamente

const TablaInternos = () => {
  const [internos, setInternos] = useState([]);

  useEffect(() => {
    cargarInternos();
  }, []);

  const cargarInternos = async () => {
    try {

      const data = await obtenerInterno();
      if(data.salida){
        console.log("Datos de internos:", data);
        setInternos(data.internos || []); 
      }
    } catch (error) {
      console.error('Error al obtener internos:', error);
    }
  };

  const handleAgregar = async () => {
    const nuevoInterno = { nombre: 'Nuevo Interno' };
    try {
      await agregarInterno(nuevoInterno);
      cargarInternos();
    } catch (error) {
      console.error('Error al agregar interno:', error);
    }
  };

  const handleActualizar = async (id) => {
    const nombreActualizado = prompt('Nuevo nombre:');
    if (!nombreActualizado) return;

    try {
      await actualizarInterno({ id : id ,  nombre: nombreActualizado });
      cargarInternos();
    } catch (error) {
      console.error('Error al actualizar interno:', error);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este interno?')) return;

    try {
      await eliminarInterno(id);
      cargarInternos();
    } catch (error) {
      console.error('Error al eliminar interno:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Lista de Internos</h2>
          <button 
            onClick={handleAgregar}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Agregar Interno
          </button>
        </div>
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {internos.map((interno) => (
              <tr key={interno.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{interno.id}</td>
                <td className="p-3">{interno.nombre}</td>
                <td className="p-3 flex justify-center space-x-2">
                  <button 
                    onClick={() => handleActualizar(interno.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button 
                    onClick={() => handleEliminar(interno.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaInternos;
