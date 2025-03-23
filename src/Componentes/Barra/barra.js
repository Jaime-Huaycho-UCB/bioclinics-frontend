import React, { useState } from 'react';
import { FaHome, FaBoxOpen, FaChartLine, FaCog, FaBars } from 'react-icons/fa';

import './barra.css';
import { Link } from 'react-router-dom';
const Barra = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      
      <div className="logo">
        <FaBoxOpen className="logo-icon" />
        {isOpen && <span className="logo-text">Inventario</span>}
      </div>
      <nav className="nav-menu">
        <a href="#" className="nav-item">
          <FaHome className="icon" />
          {isOpen && <span>Inicio</span>}
        </a>
        <a href="#" className="nav-item">
          <FaBoxOpen className="icon" />
          {isOpen && <span>Productos</span>}
        </a>
        <a href="/salida" className="nav-item">
          <FaChartLine className="icon" />
          {isOpen && <span>Reportes</span>}
        </a>
        <a href="#" className="nav-item">
          <FaCog className="icon" />
          {isOpen && <span>Configuración</span>}
        </a>
      </nav>
    </div>
  );
};

export default Barra;
