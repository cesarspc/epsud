import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function MenuUsuario() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="menu-card">
        <h1 className="menu-title">Menú de Usuario</h1>
        <div className="button-container">
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