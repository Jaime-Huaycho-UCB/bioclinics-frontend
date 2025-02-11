import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { obtenerTipos, obtenerProductos,agregarProducto,eliminarProducto,actualizarProducto } from '../peticiones/peticiones';
import './Inventario.css';
import './estilosModal.css'
const Inventario = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productos, setProductos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', precio: 0, stock: 0, idTipo: 0 });
  const navigate = useNavigate();
  const [modalActualizarOpen, setModalActualizarOpen] = useState(false);
const [productoEditado, setProductoEditado] = useState({ idProducto: 0, nombre: '', precio: 0, idTipo: 0 });

  const handleEliminar = (id) => {
    // Lógica para eliminar el producto
    console.log(`Eliminar producto con ID: ${id}`);
    // Aquí puedes llamar a tu API o actualizar el estado para eliminar el producto
  };
  
  const handleActualizar = (producto) => {
    setProductoEditado({
      id: producto.id,
      nombre: producto.producto.nombre,
      precio: producto.producto.precio,
      idTipo: producto.producto.tipo.id
    });
    setModalActualizarOpen(true);
  };
  
  
  const handleAnadirCarrito = (id) => {
    // Lógica para añadir al carrito
    console.log(`Añadir al carrito producto con ID: ${id}`);
    // Aquí puedes agregar el producto al carrito, posiblemente usando un estado global o contexto
  };
  
  useEffect(() => {
    const cargarTipos = async () => {
      try {
        const data = await obtenerTipos();
        if(data.salida){
    
        console.log("Datos de tipos:", data); // Ver qué devuelve el backend
        setTipos(data.tiposProducto || []);} // Asegurar que sea un array
      } catch (error) {
        console.error('Error al cargar los tipos:', error);
        setTipos([]); // Evita errores si hay un fallo en la petición
      }
    };
  
    cargarTipos();
  }, []);
  
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await obtenerProductos(tipoSeleccionado, searchTerm, currentPage);
        if(data.salida){
        setProductos(data.inventario || []);
        console.log(data.inventario);
        }
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };
    cargarProductos();
  }, [searchTerm, currentPage, tipoSeleccionado]);
  const handleClose = () => setModalOpen(false);
  const handleAgregarProducto = async () => {
    try {
      const resultado = await agregarProducto(nuevoProducto);
      if (resultado.salida) {
        setModalOpen(false);
        setNuevoProducto({ nombre: '', precio: 0, stock: 0, idTipo: 0 });
        setCurrentPage(1);
        console.log(resultado.mensaje)
      }else(
        console.log(resultado.mensaje)
      )
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  const eliminar = async (idProducto) => {
    try {
      const resultado = await eliminarProducto(idProducto);
      if(resultado.salida){
      console.log('Producto eliminado:', resultado);
      console.log(resultado.mensaje);
      setCurrentPage(1);
      }
      // Aquí puedes actualizar el estado o hacer alguna otra acción
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };
  const handleGuardarActualizacion = async () => {
    try {
      const resultado = await actualizarProducto(productoEditado);
      if (resultado.salida) {
        console.log(resultado.mensaje);
        setModalActualizarOpen(false);
        setCurrentPage(1); 
      } else {
        console.log(resultado.mensaje);
      }
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };
  

  return (
    <div className="inventory-container">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="header-card">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="header-text-container text-center md:text-left">
              <h1 className="gradient-title">Sistema de Inventario</h1>
              <p className="subheading text-gray-500 mt-2">Gestión inteligente de productos y existencias</p>
            </div>
            <div className="search-container flex items-center gap-4 justify-end">
              <select
                className="filter-select"
                value={tipoSeleccionado || ''}
                onChange={(e) => setTipoSeleccionado(e.target.value || null)}
              >
                <option value="">Todos los tipos</option>
                {tipos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                ))}
              </select>
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
              <button className="button-primary button-new" onClick={() => setModalOpen(true)}><FaPlus size={20} />Nuevo Producto</button>
            </div>
          </div>
        </div>
  
        <div className="table-container">
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="table-header">
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Producto</th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Precio</th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Cantidad</th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tipo</th>
          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id} className="table-row">
            <td>{producto.producto.nombre}</td>
            <td>{producto.producto.precio}</td>
            <td>{producto.stock}</td>
            <td>{producto.producto.tipo.nombre}</td>
            <td className="table-actions">
              {/* Botones de acción */}
              <button
          onClick={() => eliminar(producto.id)}
          className="action-button action-delete"
        >
          Eliminar
        </button>
        <button 
  onClick={() => handleActualizar(producto)} 
  className="action-button action-edit"
>
  Actualizar
</button>

              <button 
                onClick={() => handleAnadirCarrito(producto.id)} 
                className="action-button action-view"
              >
                Añadir al carrito
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

        {/* Paginación */}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}  // Cambiar a la página anterior
            disabled={currentPage === 1}
            className="pagination-button"
          >
            <FaChevronLeft />
          </button>
  
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`pagination-button ${currentPage === page ? 'pagination-active' : ''}`}
            >
              {page}
            </button>
          ))}
  
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="pagination-button"
          >
            <FaChevronRight />
          </button>
        </div>
  
      </div>
      <div className={`modal-overlay ${modalOpen ? 'active' : ''}`}>
      <div className="modal-container">
        <div className="modal-header">
          <h2>Agregar Producto</h2>
          <button className="close-btn" onClick={handleClose}>X</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              placeholder="Ingrese el nombre"
              value={nuevoProducto.nombre}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Precio</label>
            <input
              type="number"
              placeholder="Ingrese el precio"
              value={nuevoProducto.precio}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Cantidad</label>
            <input
              type="number"
              placeholder="Ingrese la cantidad"
              value={nuevoProducto.stock}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Tipo de Producto</label>
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
        <div className="modal-footer">
          <button className="cancel-btn" onClick={handleClose}>Cancelar</button>
          <button className="save-btn" onClick={handleAgregarProducto}>Guardar</button>
        </div>
      </div>
    </div>
    <div className={`modal-overlay ${modalActualizarOpen ? 'active' : ''}`}>
  <div className="modal-container">
    <div className="modal-header">
      <h2>Editar Producto</h2>
      <button className="close-btn" onClick={() => setModalActualizarOpen(false)}>X</button>
    </div>
    <div className="modal-body">
      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          value={productoEditado.nombre}
          onChange={(e) => setProductoEditado({ ...productoEditado, nombre: e.target.value })}
        />
      </div>
     
      <div className="form-group">
        <label>Precio</label>
        <input
          type="number"
          value={productoEditado.precio}
          onChange={(e) => setProductoEditado({ ...productoEditado, precio: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Tipo</label>
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
    <div className="modal-footer">
      <button className="cancel-btn" onClick={() => setModalActualizarOpen(false)}>Cancelar</button>
      <button className="save-btn" onClick={handleGuardarActualizacion}>Guardar</button>
    </div>
  </div>
</div>

    </div>
  );
  
};

export default Inventario;
