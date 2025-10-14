
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUsuario } from '../database';

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevoUsuario = { nombre, correo, contrasena };
        const usuarioRegistrado = registerUsuario(nuevoUsuario);

        if (usuarioRegistrado) {
            setError('');
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            navigate('/login');
        } else {
            setError('El correo electrónico ya está en uso.');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '500px' }}>
            <h1 className="text-center mb-4">Crear Cuenta</h1>
            <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre Completo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit" className="btn btn-primary w-100">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;