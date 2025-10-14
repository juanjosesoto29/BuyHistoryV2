import React from 'react';

const Contact = () => {
    return (
        <div>
            <h1>Contacto</h1>
            <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Mensaje</label>
                    <textarea className="form-control" id="message" rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    );
};

export default Contact;