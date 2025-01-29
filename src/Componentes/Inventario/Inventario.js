import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaDownload, FaPen, FaEye, FaTrashAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { obtenerTipos, obtenerProductos } from '../peticiones/peticiones';
import './Inventario.css';

const Inventario = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productos, setProductos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [totalProductos, setTotalProductos] = useState(0);
  const itemsPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const cargarTipos = async () => {
      try {
        const data = await obtenerTipos();
        setTipos(data);
      } catch (error) {
        console.error('Error al cargar los tipos:', error);
      }
    };

    cargarTipos();
  }, []);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await obtenerProductos({
          tipo: null,
          buscar: searchTerm,
          pagina: currentPage,
        });
        setProductos(data.productos); // Suponiendo que el backend devuelve un array de productos
        setTotalProductos(data.total); // Suponiendo que devuelve el total
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    cargarProductos();
  }, [searchTerm, currentPage]);

  const totalPages = Math.ceil(totalProductos / itemsPerPage);

  return (
    <div className="inventory-container">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="header-card">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="header-text-container text-center md:text-left">
              <h1 className="gradient-title">Sistema de Inventario</h1>
              <p className="subheading text-gray-500 mt-2">
                Gestión inteligente de productos y existencias
              </p>
            </div>
            <div className="search-container flex items-center gap-4 justify-end">
              <div className="relative flex-grow md:flex-grow-0">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-400 w-5 h-5" />
              </div>
              <button className="button-primary button-export">
                <FaDownload size={20} />
                Exportar
              </button>
              <button className="button-primary button-new">
                <FaPlus size={20} />
                Nuevo Producto
              </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-container">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Producto</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Precio</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Cantidad</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tipo</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id} className="table-row">
                    <td>{producto.producto}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.cantidad}</td>
                    <td>{producto.tipo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventario;
