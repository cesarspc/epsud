import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function AsignarCita() {
  const [dateTime, setDateTime] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState(''); // Agregamos este estado
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const navigate = useNavigate();



  const handleSelectDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const handleSelectSpecialtyChange = (event) => {
    setSelectedSpecialty(event.target.value);
    // Opcional: Si quieres filtrar los doctores por especialidad
    // setSelectedDoctor(''); // Reset doctor selection when specialty changes
  };  

  const handleDateTimeChange = (event) => {
    const selectedDateTime = event.target.value;
    // Convertir la fecha y hora seleccionada a formato ISO 8601
    const isoDateTime = new Date(selectedDateTime).toISOString();
    setDateTime(isoDateTime);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener especialidades
        const specialtiesResponse = await fetch('http://localhost:8000/specialties/');
        const specialtiesData = await specialtiesResponse.json();
        setSpecialties(specialtiesData);

        // Obtener doctores
        const doctorsResponse = await fetch('http://localhost:8000/doctors/');
        const doctorsData = await doctorsResponse.json();
        setDoctors(doctorsData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    

    try {
      const response = await fetch('http://localhost:8000/appointments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
          date_time: dateTime,
          user_id: localStorage.getItem('userId'), // Asumiendo que guardas el ID del usuario en localStorage al iniciar sesión
          

          status: 'Programada'
        }),
      });
      if (!response.ok) {
        throw new Error('Error al crear la cita');
      }

      alert('Cita asignada exitosamente');
      navigate('/menu-usuario');
    } catch (error) {
      alert('Error al asignar la cita: ' + error.message);
    }
  };

  return (
    <div className="app-container">
      <div className="form-card">
        <h1 className="form-title">Asignar Cita</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="specialty">Selecciona una especialidad:</label>
          <select
            id="specialty"
            name="specialty"
            value={selectedSpecialty}
            onChange={handleSelectSpecialtyChange}
          >
            <option value="">-- Selecciona --</option>
            {specialties.map((specialty) => (
              <option key={specialty.id} value={specialty.id}>
                {specialty.name}
              </option>
            ))}
          </select>

          <label htmlFor="doctor">Selecciona un doctor:</label>
          <select
            id="doctor"
            name="doctor"
            value={selectedDoctor}
            onChange={handleSelectDoctorChange}
          >
            <option value="">-- Selecciona --</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
            
          <label htmlFor="datetime">Selecciona una fecha y hora:</label>
            <input
              type="datetime-local"
              id="datetime"
              name="datetime"
              onChange={handleDateTimeChange}
          />
          <br />
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