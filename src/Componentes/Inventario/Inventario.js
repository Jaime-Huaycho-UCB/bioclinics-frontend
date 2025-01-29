import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaDownload, FaPen, FaEye, FaTrashAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Importando iconos desde react-icons
import './Inventario.css';
import { useNavigate } from 'react-router-dom';
const Inventario = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const itemsPerPage = 20;
  const [cart, setCart] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const allItems = Array(100).fill(null).map((_, index) => ({
    id: index + 1,
    producto: `Producto ${index + 1}`,
    precio: Math.floor(Math.random() * 1000) + 100,
    cantidad: Math.floor(Math.random() * 100),
    tipo: ['Electrónico', 'Ropa', 'Alimentos', 'Hogar'][Math.floor(Math.random() * 4)]
  }));

  const filteredItems = allItems.filter(item => 
    item.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const getCurrentItems = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredItems.slice(start, end);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const getTipoColor = (tipo) => {
    const colors = {
      'Electrónico': 'bg-purple-100 text-purple-800',
      'Ropa': 'bg-pink-100 text-pink-800',
      'Alimentos': 'bg-green-100 text-green-800',
      'Hogar': 'bg-blue-100 text-blue-800'
    };
    return colors[tipo] || 'bg-gray-100 text-gray-800';
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(i);
        }
      }
    }
    
    return pageNumbers;
  };
  const addToCart = (item) => {
    setCart([...cart, item]);
    setShowOverlay(true);
    setTimeout(() => setShowOverlay(false), 3000);
  };
  return (
    <div className="inventory-container">
        {showOverlay && (
        <div className="overlay">
          <p>Producto añadido</p>
          <button onClick={() => navigate('/salida')}>Finalizar</button>
        </div>
      )}
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Numero</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Producto</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Precio Unitario</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Cantidad</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tipo</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentItems().map((item) => (
                  <tr
                    key={item.id}
                    className="table-row"
                    onMouseEnter={() => setHoveredRow(item.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="custom-td">
  <div className="flex items-center gap-3">
    <div className="custom-circle">
      <span className="custom-text">{item.id}</span>
    </div>
  </div>
</td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
            
                        <span className="font-medium text-gray-900">{item.producto}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700 font-medium">
                        ${item.precio.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
  <div className="flex items-center justify-center gap-3">
    <div
      className={`status-dot ${
        item.cantidad > 50
          ? 'status-high'
          : item.cantidad > 20
          ? 'status-medium'
          : 'status-low'
      }`}
    />
    <span className="text-gray-800 text-base font-medium">{item.cantidad}</span>
  </div>
</td>

                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTipoColor(item.tipo)}`}>
                        {item.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                    <div className="table-actions">
  <button className="action-button action-edit">
    <span>Eliminar</span>
    <FaPen size={18} />
  </button>
  <button className="action-button action-view">
    <span>Actualizar</span>
    <FaEye size={18} />
  </button>
  <button className="action-button action-delete"  onClick={() => addToCart(item)}>
    <span>Agregar</span>
    <FaTrashAlt size={18} />
  </button>
</div>


                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <div className="text-sm text-gray-600">
              Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, filteredItems.length)} de {filteredItems.length} productos
            </div>
            <div className="flex items-center gap-2">
              <button
                className="pagination-button"
                onClick={() => setCurrentPage(prev => prev - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft size={20} />
              </button>
              
              {getPageNumbers().map(number => (
                <button
                  key={number}
                  className={`pagination-button ${currentPage === number ? 'pagination-active' : ''}`}
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </button>
              ))}
              
              <button
                className="pagination-button"
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage === totalPages}
              >
                <FaChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventario;
