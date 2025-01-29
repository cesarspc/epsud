import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Aquí podrías agregar la lógica de autenticación
    alert(`Usuario: ${username}, Clave: ${password}`);
  };

  return (
    <div className="app-container">
      <header className="login-card">
        <h1 className="login-title">Login</h1>
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            type="text"
            placeholder="Escribe tu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Clave</label>
          <input
            id="password"
            type="password"
            placeholder="Escribe tu clave"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin} className="login-button">
          Iniciar sesión
        </button>
      </header>
    </div>
  );
}

export default App;
