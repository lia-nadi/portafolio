import React from 'react';

const Contacto = () => (
  <section id="contacto" className="py-5 bg-light">
    <div className="container">
      <h2 className="section-title text-center">Contacto</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Información del Alumno</h5>
              <p><strong>Nombre:</strong> Nadine Heiddy Aceituno Moya</p>
              <p><strong>Email:</strong> <a href="naceituno@est.unap.edu.pe">naceituno@est.unap.edu.pe</a></p>
              <p><strong>LinkedIn:</strong> <a href="linkedin.com/in/nadine-heiddy-aceituno-moya-5152b831b" target="_blank" rel="noopener noreferrer">linkedin.com/in/nadineaceituno</a></p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Envíame un mensaje</h5>
              <form onSubmit={e => { e.preventDefault(); alert('¡Mensaje enviado!'); }}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input type="text" className="form-control" id="nombre" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="mensaje" className="form-label">Mensaje</label>
                  <textarea className="form-control" id="mensaje" rows="3" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Contacto;
