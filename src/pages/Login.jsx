// src/pages/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../database';

const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const usuario = loginUsuario(correo, contrasena);
        if (usuario) {
            setError('');
            alert('¡Inicio de sesión exitoso!');
            // Redirigir al home o a la cuenta del usuario
            navigate('/');
        } else {
            setError('Correo o contraseña incorrectos.');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '500px' }}>
            <h1 className="text-center mb-4">Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;