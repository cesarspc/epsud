import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function AsignarCita() {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para guardar la cita
    alert(`Cita asignada para el ${fecha} a las ${hora}. Motivo: ${motivo}`);
    navigate('/menu-usuario'); // Redirige al menú de usuario después de asignar la cita
  };

  return (
    <div className="app-container">
      <div className="form-card">
        <h1 className="form-title">Asignar Cita</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fecha">Fecha</label>
            <input
              id="fecha"
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="hora">Hora</label>
            <input
              id="hora"
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="motivo">Motivo</label>
            <textarea
              id="motivo"
              placeholder="Describe el motivo de la cita"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="form-button">
            Asignar Cita
          </button>
        </form>

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

export default AsignarCita;