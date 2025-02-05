import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function VerCitas() {
  const navigate = useNavigate();
  const [citas, setCitas] = useState([]);

  // Obtener las citas al cargar el componente
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Función para obtener las citas
  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:8000/users/appointments/', {
        method: 'GET',
        credentials: 'include',
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al obtener las citas: ${response.status} - ${errorMessage}`);
      }
  
      const data = await response.json();
      setCitas(data);
    } catch (error) {
      console.error('Error al obtener citas:', error);
      alert('Error al cargar las citas: ' + error.message);
    }
  };

  // Función para cancelar una cita
  const handleCancelAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`http://localhost:8000/appointments/${appointmentId}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al cancelar la cita');
      }

      // Actualizar la lista de citas después de cancelar
      fetchAppointments();
      alert('Cita cancelada exitosamente');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cancelar la cita');
    }
  };

  // Función para formatear la fecha y hora
  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return {
      fecha: date.toLocaleDateString(),
      hora: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="app-container">
      <div className="form-card">
        <h1 className="form-title">Citas Asignadas</h1>

        {/* Lista de citas */}
        <div className="citas-list">
          {citas.length === 0 ? (
            <p>No hay citas programadas</p>
          ) : (
            citas.map((cita) => {
              const { fecha, hora } = formatDateTime(cita.date_time);
              return (
                <div key={cita.id} className="cita-item">
                  <p><strong>Fecha:</strong> {fecha}</p>
                  <p><strong>Hora:</strong> {hora}</p>
                  <p><strong>Estado:</strong> {cita.status}</p>
                  {cita.status !== 'Cancelada' && (
                    <button 
                      className="form-button"
                      onClick={() => handleCancelAppointment(cita.id)}
                    >
                      Cancelar Cita
                    </button>
                  )}
                </div>
              );
            })
          )}
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