import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [cedula, setCedula] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el registro
    console.log('Cédula:', cedula);
    console.log('Correo:', email);
    console.log('Clave:', password);
    alert('Registro exitoso!');
  };

  return (
    <div className="app-container">
      <div className="login-card">
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