import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import logo from '../assets/logo.jpg';

function MenuUsuario() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="menu-card">
        <h1 className="menu-title">Menú de Usuario</h1>
        <div className="button-container">
        <img src={logo} alt="Logo" className="logo" />
          {/* Botón para asignar cita */}
          <button
            onClick={() => navigate('/asignar-cita')} // Cambia la ruta según tu necesidad
            className="menu-button"
          >
            Asignar Cita
          </button>

          {/* Botón para ver citas asignadas */}
          <button
            onClick={() => navigate('/ver-citas')} // Cambia la ruta según tu necesidad
            className="menu-button"
          >
            Historial de Citas
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuUsuario;