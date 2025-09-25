import React from 'react';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
    <div className="container">
      <a className="navbar-brand" href="#inicio">
        <i className="fas fa-globe-americas me-2"></i>EST334 - Estadística Espacial
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><a className="nav-link" href="#inicio">Inicio</a></li>
          <li className="nav-item"><a className="nav-link" href="#historia">Historia</a></li>
          <li className="nav-item"><a className="nav-link" href="#temario">Temario</a></li>
          <li className="nav-item"><a className="nav-link" href="#trabajos">Trabajos</a></li>
          <li className="nav-item"><a className="nav-link" href="#recursos">Recursos</a></li>
          <li className="nav-item"><a className="nav-link" href="#juego">Juego Educativo</a></li>
          <li className="nav-item"><a className="nav-link" href="#mapas">Mapas Interactivos</a></li>
          <li className="nav-item"><a className="nav-link" href="#contacto">Contacto</a></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
