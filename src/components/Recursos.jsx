import React from 'react';

const Recursos = () => (
  <section id="recursos" className="py-5">
    <div className="container">
      <h2 className="section-title text-center">Recursos Adicionales</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="fas fa-book fa-3x text-primary mb-3"></i>
              <h5 className="card-title">Bibliografía Recomendada</h5>
              <p className="card-text">Libros y artículos científicos sobre estadística espacial.</p>
              <button className="btn btn-primary" onClick={() => window.open('https://www.springer.com/gp/book/9783319293545', '_blank')}>Ver Lista</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="fas fa-laptop-code fa-3x text-primary mb-3"></i>
              <h5 className="card-title">Software y Herramientas</h5>
              <p className="card-text">Recursos informáticos para análisis espacial: R, Python, QGIS, etc.</p>
              <button className="btn btn-primary" onClick={() => window.open('https://qgis.org/', '_blank')}>Explorar</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="fas fa-project-diagram fa-3x text-primary mb-3"></i>
              <h5 className="card-title">Proyectos de Ejemplo</h5>
              <p className="card-text">Casos de estudio y proyectos aplicados de estadística espacial.</p>
              <button className="btn btn-primary" onClick={() => window.open('https://spatialanalysis.github.io/', '_blank')}>Ver Proyectos</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 text-center">
          <div className="alert alert-info" role="alert">
            <strong>¿Tienes un recurso favorito?</strong> ¡Compártelo con la comunidad y haz crecer este portafolio!
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Recursos;
