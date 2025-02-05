import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';


function AsignarCita() {
  const [dateTime, setDateTime] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState(''); // Agregamos este estado
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [yamlData, setYamlData] = useState(null)
  const navigate = useNavigate();
  


  useEffect(() => {
    // Modificamos esta función para obtener los datos del backend
    const loadYAML = async () => {
      try {
        const response = await fetch('http://localhost:8000/available-hours');
        const data = await response.json();
        setYamlData(data); 
      } catch (error) {
        console.error('Error al cargar horarios disponibles:', error);
      }
    };

    loadYAML();
  }, []);


  const handleSelectDoctorChange = async (event) => {
    const doctorId = event.target.value;
    setSelectedDoctor(doctorId);
  };

  const handleSelectSpecialtyChange = (event) => {
    setSelectedSpecialty(event.target.value);
    // setSelectedDoctor(''); // Reset doctor selection when specialty changes
  };  

  const handleDateTimeChange = (event) => {
    const selectedDateTime = new Date(event.target.value);
    console.log(typeof selectedDateTime);
    selectedDateTime.setHours(selectedDateTime.getHours() - 5); // Colombia UTC-5
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
    
    if (!selectedDoctor || !selectedSpecialty || !dateTime) {
      alert('Por favor, completa todos los campos');
      return;
    }    

    try {
      const response = await fetch('http://localhost:8000/appointments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
          date_time: dateTime,
          doctor_id: selectedDoctor, // Convertimos a string
          specialty_id: parseInt(selectedSpecialty), // Este sí debe ser número
          status: 'Programada'
        }),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        alert("Error al asignar cita, intente de nuevo: " + JSON.stringify(responseData))
        throw new Error('Error al crear la cita');
        
      }

      alert('Cita asignada exitosamente');
      navigate('/menu-usuario');
    } catch (error) {
      console.error('Error al asignar cita:', error);
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
          <br /> <br />
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
          <br /> <br />

          <label htmlFor="datetime">Selecciona una fecha y hora:</label>
            <input
              type="datetime-local"
              id="datetime"
              name="datetime"
              onChange={handleDateTimeChange}
          />
          <br /> <br />
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
      {yamlData && (
        <div className="yaml-preview" style={{ border: '1px solid #ccc', padding: '15px', width: '350px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h2 style={{ textAlign: 'center' }}>Disponibilidad de Doctores</h2>
          <h3>Doctores</h3>

          {yamlData.doctors && yamlData.doctors.map((doctor, index) => (
            <div key={index} style={{ marginBottom: '10px', padding: '8px', backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <strong>Dr.</strong> {doctor.doctor} <br />
              <strong>Especialidad:</strong> {doctor.specialty} <br />
              <strong>Horas disponibles:</strong>
              <ul>
                {doctor.available_hours.map((hour, i) => (
                  <li key={i}>{hour}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AsignarCita;