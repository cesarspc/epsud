import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function VerCitas() {
  const navigate = useNavigate();

  // Datos de ejemplo (puedes reemplazarlos con datos reales)
  const citas = [
    { id: 1, fecha: '2023-10-15', hora: '10:00', motivo: 'Consulta general' },
    { id: 2, fecha: '2023-10-16', hora: '14:00', motivo: 'Control de rutina' },
  ];

  return (
    <div className="app-container">
      <div className="form-card">
        <h1 className="form-title">Citas Asignadas</h1>

        {/* Lista de citas */}
        <div className="citas-list">
          {citas.map((cita) => (
            <div key={cita.id} className="cita-item">
              <p><strong>Fecha:</strong> {cita.fecha}</p>
              <p><strong>Hora:</strong> {cita.hora}</p>
              <p><strong>Motivo:</strong> {cita.motivo}</p>
              <button className="form-button">Cancelar Cita</button>
            </div>
          ))}
        </div>

        {/* Botón para volver al menú de usuario */}
        <button
          onClick={() => navigate('/menu-usuario')}
          className="form-button secondary"
        >
          Volver al Menú
        </button>
      </div>
    </div>
  );
}

export default VerCitas;