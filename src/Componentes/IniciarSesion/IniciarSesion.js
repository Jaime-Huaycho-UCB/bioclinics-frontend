import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../peticiones/peticiones';
import './iniciarSesion.css';
import { 
  FaUser, 
  FaLock, 
  FaGoogle, 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin,
  FaHeartbeat,
  FaStethoscope,
  FaMedkit,
  FaRegHospital
} from 'react-icons/fa';
import { MdEmail, MdLocalHospital, MdHealthAndSafety } from 'react-icons/md';
import { RiMentalHealthFill } from 'react-icons/ri';

const IniciarSesion = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      const data = await iniciarSesion(nombreUsuario, contrasena);
      if (data.salida) {
        navigate('/dashboard');
      } else {
        alert(data.mensaje || 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      alert(error || 'Error al iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-page">
      <div className="animated-bg">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
      </div>
      
      <div className="login-container">
        <div className="login-left">
          <div className="logo-container">
            <div className="logo">
              <MdHealthAndSafety className="logo-icon" />
            </div>
            <span className="logo-text">Bioclinics</span>
          </div>
          
          <div className="illustration">
            <div className="medical-icons">
              <FaHeartbeat className="medical-icon icon-1" />
              <FaStethoscope className="medical-icon icon-2" />
              <FaMedkit className="medical-icon icon-3" />
              <FaRegHospital className="medical-icon icon-4" />
              <RiMentalHealthFill className="medical-icon icon-5" />
            </div>
            <div className="slogan">
              <h2>Cuidando tu salud,</h2>
              <h3>cuidamos tu futuro.</h3>
            </div>
          </div>
          
          <div className="clinic-info">
            <div className="info-item">
              <MdLocalHospital className="info-icon" />
              <span>Servicios médicos de alta calidad</span>
            </div>
            <div className="info-item">
              <FaStethoscope className="info-icon" />
              <span>Profesionales certificados</span>
            </div>
           
          </div>

        </div>

        <div className="login-right">
          <div className="login-form-container">
            <div className="welcome-text">
              <h2>¡Bienvenido de nuevo!</h2>
              <p>Accede a tu portal médico personal</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <div className="input-container">
                  <MdEmail className="input-icon" />
                  <input
                    type="text"
                    id="email"
                    placeholder="correo@ejemplo.com"
                    value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                    required
                  />
                  <div className="input-focus-effect"></div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <div className="input-container">
                  <FaLock className="input-icon" />
                  <input
                    type={mostrarContrasena ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="toggle-password"
                    onClick={() => setMostrarContrasena(!mostrarContrasena)}
                  >
                    {mostrarContrasena ? "Ocultar" : "Mostrar"}
                  </button>
                  <div className="input-focus-effect"></div>
                </div>
              </div>

              <div className="forgot-password">
                <a href="#">¿Olvidaste tu contraseña?</a>
              </div>

              <button 
                type="submit" 
                className={`login-button ${cargando ? 'loading' : ''}`}
                disabled={cargando}
              >
                {cargando ? (
                  <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                  </div>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>

              <div className="social-login">
                <div className="social-divider">
                  <span>o continuar con</span>
                </div>
                <div className="social-icons">
                  <button type="button" className="social-icon google">
                    <FaGoogle />
                  </button>
                  <button type="button" className="social-icon facebook">
                    <FaFacebook />
                  </button>
                  <button type="button" className="social-icon twitter">
                    <FaTwitter />
                  </button>
                  <button type="button" className="social-icon linkedin">
                    <FaLinkedin />
                  </button>
                </div>
              </div>
          
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;