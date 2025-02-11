import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IniciarSesion from './Componentes/IniciarSesion/IniciarSesion';
import Inventario from './Componentes/Inventario/Inventario';
import Salida from './Componentes/PantallaSalida/salida';
import Barra from './Componentes/Barra/barra';// Importar el componente de la barra lateral
import TablaInternos from './Componentes/Internos/Internos';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<IniciarSesion />} />
            <Route path="/dashboard" element={<Inventario />} />
            <Route path="/salida" element={<Salida />} />
            <Route path='/internos' element={<TablaInternos />} />
          </Routes>
        </div>
        {/* Barra lateral a la derecha */}
        <Barra />
      </div>
    </Router>
  );
}

export default App;
