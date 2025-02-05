import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';

function Register() {
  const [cedula, setCedula] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cedula || !name || !email || !password) {
      alert('Todos los campos son obligatorios');
      return;
    }
    await submitRegistration(); // Llama a la función de registro
  };

  const submitRegistration = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: cedula, // Usamos la cédula como ID
        name: name,
        email: email,
        password: password, // Enviamos la contraseña (debería hashearse en el backend)
      }),
    };

    try {
      const response = await fetch('http://localhost:8000/users/', requestOptions);
      

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error en el registro');
      }
      
      
      alert('Registro exitoso');
      navigate('/login');
    } catch (error) {
      alert('Error en el registro: ' + error.message);
    }
  };

  return (
    <div className="app-container">
      <div className="login-card">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="login-title">Registrarse</h1>

        <form onSubmit={handleSubmit}>
          {/* Campo para la cédula */}
          <div className="form-group">
            <label htmlFor="cedula">Cédula</label>
            <input
              id="cedula"
              type="text"
              placeholder="Ingresa tu cédula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
            />
          </div>

          {/* Campo para el nombre */}
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              id="nombre"
              type="text"
              placeholder="Ingresa tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Campo para el correo */}
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Campo para la clave */}
          <div className="form-group">
            <label htmlFor="password">Clave</label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu clave"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Botón de registro */}
          <button type="submit" className="login-button">
            Registrarse
          </button>
        </form>

        {/* Enlace para volver al login */}
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Link to="/">Volver a la página principal</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;