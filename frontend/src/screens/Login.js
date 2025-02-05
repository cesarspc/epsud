import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import logo from '../assets/logo.jpg';

function Login() {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitLogin = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: cedula, // Usamos la cédula como ID
        password: password, // Enviamos la contraseña (debería hashearse en el backend)
      }),
    };

    try {
      const response = await fetch('http://localhost:8000/login/', requestOptions);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error en el login');
      }
    
      alert('Login exitoso');
      navigate('/menu-usuario');
    } catch (error) {
      alert('Error en el registro: ' + error.message);
    }
  };
  return (
    <div className="app-container">
      <div className="login-card">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="login-title">Iniciar sesión</h1>
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
        <button onClick={submitLogin} className="login-button">
          Iniciar sesión
        </button>

        {/* Enlace para ir a la página de registro */}
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </p>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Link to="/">Volver a la página principal</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;