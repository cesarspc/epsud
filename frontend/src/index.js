import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa BrowserRouter, Routes y Route
import App from './App';
import Login from './screens/Login'; // Importa el componente Login
import Register from './screens/Register'; // Importa el componente Register

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} /> {/* Ruta para la página principal */}
      <Route path="/login" element={<Login />} /> {/* Ruta para la página de login */}
      <Route path="/register" element={<Register />} /> {/* Ruta para la página de registro */}
    </Routes>
  </BrowserRouter>
);