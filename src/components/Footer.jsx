import React from 'react';

const Footer = () => (
  <footer className="text-center">
    <div className="container">
      <p className="mb-1">&copy; {new Date().getFullYear()} Estadística Espacial - EST334 | Portafolio profesional desarrollado con React, Bootstrap, Leaflet y Chart.js</p>
      <p className="mb-0">
        <a href="#inicio" className="text-white me-2"><i className="fas fa-arrow-up"></i> Volver arriba</a>
        <span className="mx-2">|</span>
        <a href="https://github.com/tuusuario/portafolio-estadistica" target="_blank" rel="noopener noreferrer" className="text-white"><i className="fab fa-github"></i> Ver en GitHub</a>
      </p>
    </div>
  </footer>
);

export default Footer;
