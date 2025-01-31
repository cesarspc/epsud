import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí podrías agregar la lógica de autenticación
    alert(`Cédula: ${cedula}, Clave: ${password}`);
    navigate('/menu-usuario'); // Redirige a la página principal después del login
  };

  return (
    <div className="app-container">
      <div className="login-card">
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
        <button onClick={handleLogin} className="login-button">
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