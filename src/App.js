import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import IniciarSesion from './Componentes/IniciarSesion/IniciarSesion';
import Inventario from './Componentes/Inventario/Inventario';
import Salida from './Componentes/PantallaSalida/salida';
import TablaInternos from './Componentes/Internos/Internos';
import Barra from './Componentes/Barra/barra';

function AppContent() {
  const location = useLocation();
  const isLogin = location.pathname === '/';

  return isLogin ? (
    // Solo login, sin layout ni estilos generales
    <Routes>
      <Route path="/" element={<IniciarSesion />} />
    </Routes>
  ) : (
    // Layout completo para el resto de rutas
    <div className="App">
      <div className="layout">
        <Barra />
        <div className="content">
          <Routes>
            <Route path="/dashboard" element={<Inventario />} />
            <Route path="/salida" element={<Salida />} />
            <Route path="/internos" element={<TablaInternos />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
