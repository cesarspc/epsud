import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa BrowserRouter, Routes y Route
import App from './App';
import Login from './screens/Login'; // Importa el componente Login
import Register from './screens/Register'; // Importa el componente Register
import MenuUsuario from './screens/MenuUsuario';
import AsignarCita from './screens/AsignarCita'; // Importa el componente AsignarCita
import VerCitas from './screens/VerCitas'; // Importa el componente VerCitas

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} /> {/* Ruta para la página principal */}
      <Route path="/login" element={<Login />} /> {/* Ruta para la página de login */}
      <Route path="/register" element={<Register />} /> {/* Ruta para la página de registro */}
      <Route path="/menu-usuario" element={<MenuUsuario />} /> {/* Ruta para el menú de usuario */}
      <Route path="/asignar-cita" element={<AsignarCita />} /> {/* Ruta para asignar cita */}
      <Route path="/ver-citas" element={<VerCitas />} /> {/* Ruta para ver citas */}
    </Routes>
  </BrowserRouter>
);