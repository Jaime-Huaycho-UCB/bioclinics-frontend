import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaDownload, FaChevronLeft, FaChevronRight, FaTrash, FaEdit, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { obtenerTipos, obtenerProductos, agregarProducto, eliminarProducto, actualizarProducto } from '../peticiones/peticiones';
import './Inventario.css';

const Inventario = () => {
  // Estados
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productos, setProductos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalActualizarOpen, setModalActualizarOpen] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', precio: 0, stock: 0, idTipo: 0 });
  const [productoEditado, setProductoEditado] = useState({ idProducto: 0, nombre: '', precio: 0, idTipo: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  const navigate = useNavigate();

  // Mostrar notificación
  const showNotification = (message, type = 'success') => {
    setNotification({
      show: true,
      message,
      type
    });
    
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Cargar tipos de productos
  useEffect(() => {
    const cargarTipos = async () => {
      try {
        const data = await obtenerTipos();
        if (data.salida) {
          setTipos(data.tiposProducto || []);
        } else {
          showNotification('No se pudieron cargar los tipos de productos', 'error');
        }
      } catch (error) {
        console.error('Error al cargar los tipos:', error);
        setTipos([]);
      }
    };
  
    cargarTipos();
  }, []);
  
  // Cargar productos
  useEffect(() => {
    const cargarProductos = async () => {
      setIsLoading(true);
      try {
        const data = await obtenerProductos(tipoSeleccionado, searchTerm, currentPage);
        if (data.salida) {
          setProductos(data.inventario || []);
        } else {
          showNotification('Error al cargar productos', 'error');
        }
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const timer = setTimeout(() => {
      cargarProductos();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, currentPage, tipoSeleccionado]);

  // Cerrar modal
  const handleClose = () => setModalOpen(false);
  
  // Agregar producto
  const handleAgregarProducto = async () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.stock || !nuevoProducto.idTipo) {
      showNotification('Por favor complete todos los campos', 'error');
      return;
    }
    
    try {
      const resultado = await agregarProducto(nuevoProducto);
      if (resultado.salida) {
        setModalOpen(false);
        setNuevoProducto({ nombre: '', precio: 0, stock: 0, idTipo: 0 });
        showNotification('Producto agregado correctamente');
        
        // Recargar productos
        const data = await obtenerProductos(tipoSeleccionado, searchTerm, 1);
        if (data.salida) {
          setProductos(data.inventario || []);
          setCurrentPage(1);
        }
      } else {
        showNotification(resultado.mensaje || 'Error al agregar producto', 'error');
      }
    } catch (error) {
      console.error('Error al agregar producto:', error);
      showNotification('Error al agregar producto', 'error');
    }
  };

  // Eliminar producto
  const eliminar = async (idProducto) => {
    
    
    try {
      const resultado = await eliminarProducto(idProducto);
      if (resultado.salida) {
        showNotification('Producto eliminado correctamente');
        
        // Recargar productos
        const data = await obtenerProductos(tipoSeleccionado, searchTerm, currentPage);
        if (data.salida) {
          setProductos(data.inventario || []);
        }
      } else {
        showNotification(resultado.mensaje || 'Error al eliminar producto', 'error');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      showNotification('Error al eliminar producto', 'error');
    }
  };

  // Preparar actualización
  const handleActualizar = (producto) => {
    setProductoEditado({
      id: producto.id,
      nombre: producto.producto.nombre,
      precio: producto.producto.precio,
      idTipo: producto.producto.tipo.id
    });
    setModalActualizarOpen(true);
  };
  
  // Guardar actualización
  const handleGuardarActualizacion = async () => {
    if (!productoEditado.nombre || !productoEditado.precio || !productoEditado.idTipo) {
      showNotification('Por favor complete todos los campos', 'error');
      return;
    }
    
    try {
      const resultado = await actualizarProducto(productoEditado);
      if (resultado.salida) {
        setModalActualizarOpen(false);
        showNotification('Producto actualizado correctamente');
        
        // Recargar productos
        const data = await obtenerProductos(tipoSeleccionado, searchTerm, currentPage);
        if (data.salida) {
          setProductos(data.inventario || []);
        }
      } else {
        showNotification(resultado.mensaje || 'Error al actualizar producto', 'error');
      }
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      showNotification('Error al actualizar producto', 'error');
    }
  };
  
  // Añadir al carrito
  const handleAnadirCarrito = (id) => {
    showNotification('Producto añadido al carrito');
  };

  return (
    <div className="bioclinic-inventory">
      {/* Panel superior */}
      <div className="bioclinic-header">
        <div className="bioclinic-title">
          <h1>Inventario Bioclinic</h1>
          <p>Sistema de gestión de insumos médicos</p>
        </div>
        
        {/* Notificación */}
        {notification.show && (
          <div className={`bioclinic-notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
        
        {/* Filtros y buscador */}
        <div className="bioclinic-filters">
          <div className="bioclinic-filter-group">
            <select
              className="bioclinic-select"
              value={tipoSeleccionado || ''}
              onChange={(e) => setTipoSeleccionado(e.target.value || null)}
            >
              <option value="">Todos los tipos</option>
              {tipos.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
              ))}
            </select>
            
            <div className="bioclinic-search">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="bioclinic-search-icon" />
            </div>
          </div>
          
          <div className="bioclinic-action-buttons">
            <button className="bioclinic-btn btn-secondary">
              <FaDownload /> Exportar
            </button>
            <button className="bioclinic-btn btn-primary" onClick={() => setModalOpen(true)}>
              <FaPlus /> Nuevo
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="bioclinic-table-container">
        {isLoading ? (
          <div className="bioclinic-loading">
            <div className="bioclinic-spinner"></div>
            <p>Cargando productos...</p>
          </div>
        ) : productos.length === 0 ? (
          <div className="bioclinic-empty">
            <p>No se encontraron productos</p>
          </div>
        ) : (
          <table className="bioclinic-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Tipo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.producto.nombre}</td>
                  <td>${parseFloat(producto.producto.precio).toFixed(2)}</td>
                  <td>{producto.stock}</td>
                  <td>{producto.producto.tipo.nombre}</td>
                  <td className="bioclinic-actions">
                    <button 
                      className="bioclinic-icon-btn delete" 
                      onClick={() => eliminar(producto.id)}
                      title="Eliminar"
                    >
                      <FaTrash />
                    </button>
                    <button 
                      className="bioclinic-icon-btn edit" 
                      onClick={() => handleActualizar(producto)}
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="bioclinic-icon-btn cart" 
                      onClick={() => handleAnadirCarrito(producto.id)}
                      title="Añadir al carrito"
                    >
                      <FaShoppingCart />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Paginación */}
      <div className="bioclinic-pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bioclinic-pagination-btn"
        >
          <FaChevronLeft />
        </button>

        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`bioclinic-pagination-btn ${currentPage === page ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="bioclinic-pagination-btn"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Modal Agregar Producto */}
      <div className={`bioclinic-modal-overlay ${modalOpen ? 'active' : ''}`}>
        <div className="bioclinic-modal">
          <div className="bioclinic-modal-header">
            <h2>Nuevo Producto</h2>
            <button className="bioclinic-modal-close" onClick={handleClose}>×</button>
          </div>
          <div className="bioclinic-modal-body">
            <div className="bioclinic-form-group">
              <label>Nombre del producto</label>
              <input
                type="text"
                value={nuevoProducto.nombre}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                placeholder="Ingrese nombre del producto"
              />
            </div>

            <div className="bioclinic-form-group">
              <label>Precio</label>
              <input
                type="number"
                value={nuevoProducto.precio}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
                placeholder="Ingrese precio"
                min="0"
                step="0.01"
              />
            </div>

            <div className="bioclinic-form-group">
              <label>Cantidad</label>
              <input
                type="number"
                value={nuevoProducto.stock}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
                placeholder="Ingrese cantidad disponible"
                min="0"
              />
            </div>

            <div className="bioclinic-form-group">
              <label>Tipo de producto</label>
              <select
                value={nuevoProducto.idTipo}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, idTipo: e.target.value })}
              >
                <option value="">Seleccionar tipo</option>
                {tipos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="bioclinic-modal-footer">
            <button className="bioclinic-btn btn-outline" onClick={handleClose}>Cancelar</button>
            <button className="bioclinic-btn btn-primary" onClick={handleAgregarProducto}>Guardar</button>
          </div>
        </div>
      </div>

      {/* Modal Editar Producto */}
      <div className={`bioclinic-modal-overlay ${modalActualizarOpen ? 'active' : ''}`}>
        <div className="bioclinic-modal">
          <div className="bioclinic-modal-header">
            <h2>Editar Producto</h2>
            <button className="bioclinic-modal-close" onClick={() => setModalActualizarOpen(false)}>×</button>
          </div>
          <div className="bioclinic-modal-body">
            <div className="bioclinic-form-group">
              <label>Nombre del producto</label>
              <input
                type="text"
                value={productoEditado.nombre}
                onChange={(e) => setProductoEditado({ ...productoEditado, nombre: e.target.value })}
              />
            </div>

            <div className="bioclinic-form-group">
              <label>Precio</label>
              <input
                type="number"
                value={productoEditado.precio}
                onChange={(e) => setProductoEditado({ ...productoEditado, precio: e.target.value })}
                min="0"
                step="0.01"
              />
            </div>

            <div className="bioclinic-form-group">
              <label>Tipo de producto</label>
              <select
                value={productoEditado.idTipo}
                onChange={(e) => setProductoEditado({ ...productoEditado, idTipo: e.target.value })}
              >
                <option value="">Seleccionar tipo</option>
                {tipos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="bioclinic-modal-footer">
            <button className="bioclinic-btn btn-outline" onClick={() => setModalActualizarOpen(false)}>
              Cancelar
            </button>
            <button className="bioclinic-btn btn-primary" onClick={handleGuardarActualizacion}>
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventario;