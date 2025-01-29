import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IniciarSesion from './Componentes/IniciarSesion/IniciarSesion';
import Inventario from './Componentes/Inventario/Inventario';// Suponiendo que tienes un componente Dashboard
import Salida from './Componentes/PantallaSalida/salida';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<IniciarSesion />} />
          <Route path="/dashboard" element={<Inventario />} />
          <Route path="/salida" element={<Salida />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
