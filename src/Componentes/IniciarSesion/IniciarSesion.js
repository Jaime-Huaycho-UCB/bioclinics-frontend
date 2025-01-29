import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./iniciarSesion.css";

const IniciarSesion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Usuario y contraseña predeterminados
  const predefinedUser = {
    email: 'admin@farmacia.com',
    password: '123456',
  };

  // Manejo del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita el refresco de la página

    if (email === predefinedUser.email && password === predefinedUser.password) {
      // Redirigir a otra pantalla si las credenciales son correctas
      navigate('/dashboard'); // Cambia "/dashboard" por la ruta deseada
    } else {
      alert('Usuario o contraseña incorrectos');
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
              <label htmlFor="email">Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="inputItem">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
