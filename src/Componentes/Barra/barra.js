import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaRegClock, FaSearch, FaStar, FaBell, FaBookmark, FaBars } from 'react-icons/fa';
import './barra.css'; // Archivo de estilos

const Barra = () => {
  return (
    <div className="sidebar-container-right">
      <nav className="sidebar-right">
        {/* Logo */}
        <div className="logo-container">
          <div className="logo" />
          <div className="logo-tooltip">BioClinics</div>
        </div>

        {/* Navigation Items */}
        <div className="nav-items">
          {[
            { icon: <FaHome size={20} />, label: 'Iniciar sesion', link: '/' },
            { icon: <FaRegClock size={20} />, label: 'Incio', link: '/dashboard' },
            { icon: <FaSearch size={20} />, label: 'Ventas', link: '/salida' },
            { icon: <FaStar size={20} />, label: 'Internos', link: '/internos' },
          ].map((item, index) => (
            <div key={index} className="nav-item">
              <Link to={item.link} className="nav-link">
                {item.icon}
                <span className="nav-label">{item.label}</span>
              </Link>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Barra;
