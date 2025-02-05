import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import logo from './assets/logo.jpg';

function App() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="login-card">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="login-title">Bienvenido</h1>
        <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Por favor, selecciona una opción:
        </p>

        {/* Botón para redirigir a la página de inicio de sesión */}
        <button
          onClick={() => navigate('/login')}
          className="login-button"
          style={{ marginBottom: '10px' }}
        >
          Iniciar sesión
        </button>

        {/* Botón para redirigir a la página de registro */}
        <button
          onClick={() => navigate('/register')}
          className="login-button"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default App;