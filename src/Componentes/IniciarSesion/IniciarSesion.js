import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../peticiones/peticiones';
import "./iniciarSesion.css";

const IniciarSesion = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await iniciarSesion(nombreUsuario, contrasena);
      if (data.salida) {
        navigate('/dashboard');
      } else {
        alert(data.mensaje || 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      alert(error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="contenedorIniciarSesion">
      <div className="parteDerechaImagen">
        <p>Aquí podría ir una imagen de una farmacia</p>
      </div>

      <div className="parteIzquierdaContenedor">
        <div className="titulo">
          <h1>Iniciar Sesión</h1>
        </div>

        <form className="contenedorFormulario" onSubmit={handleSubmit}>
          <div className="contenedorInputs">
            <div className="inputItem">
              <label htmlFor="nombreUsuario">Nombre de Usuario:</label>
              <input
                type="text"
                id="nombreUsuario"
                placeholder="Ingresa tu usuario"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
              />
            </div>

            <div className="inputItem">
              <label htmlFor="contraseña">Contraseña:</label>
              <input
                type="password"
                id="contraseña"
                placeholder="Ingresa tu contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
              />
            </div>
          </div>

          <div className="botonIniciarSesion">
            <button type="submit">Iniciar Sesión</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IniciarSesion;
