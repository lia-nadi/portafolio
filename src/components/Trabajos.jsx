import React from 'react';

const Trabajos = () => (
  <section id="trabajos" className="py-5">
    <div className="container">
      <h2 className="section-title text-center">Trabajos del Semestre</h2>
      <p className="text-center mb-4">A continuación se muestran los trabajos realizados durante el semestre. Haz clic en cada tarjeta para acceder al contenido.</p>
      <div className="row">
        <div className="col-md-4">
          <div className="card work-card h-100">
            <div className="card-body">
              <h5 className="card-title">Tarea 1: Posicionamiento de Información </h5>
              <p className="card-text">Análisis de técnicas para el posicionamiento y visualización de información geoespacial.</p>
              <p className="text-muted"><small>Unidad 1 | Fecha de entrega: 15/09/2025</small></p>
              <a href="https://drive.google.com/drive/folders/1NKQRRrO1beVoy0BNi85wiyQS3dc5Wgk7?usp=sharing" className="btn btn-primary stretched-link">Ver Trabajo</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card work-card h-100">
            <div className="card-body">
              <h5 className="card-title">Tarea 2: Muestreo Bootstrap ...d</h5>
              <p className="card-text">Aplicación de técnicas de remuestreo bootstrap en el análisis de datos espaciales.</p>
              <p className="text-muted"><small>Unidad 1 | Fecha de entrega: 29/09/2025</small></p>
              <a href="https://drive.google.com/drive/folders/1NKQRRrO1beVoy0BNi85wiyQS3dc5Wgk7?usp=sharing" className="btn btn-primary stretched-link">Ver Trabajo</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card work-card h-100">
            <div className="card-body">
              <h5 className="card-title">Tarea 3: Gaussian Random Fields</h5>
              <p className="card-text">Modelado de campos aleatorios gaussianos para simulación de procesos espaciales.</p>
              <p className="text-muted"><small>Unidad 1 | Fecha de entrega: 13/10/2025</small></p>
              <a href="https://drive.google.com/drive/folders/1NKQRRrO1beVoy0BNi85wiyQS3dc5Wgk7?usp=sharing" className="btn btn-primary stretched-link">Ver Trabajo</a>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card work-card h-100">
            <div className="card-body">
              <h5 className="card-title">Proyecto 1: Análisis de Autocorrelación Espacial</h5>
              <p className="card-text">Aplicación del Índice de Moran y otros indicadores de autocorrelación espacial.</p>
              <p className="text-muted"><small>Unidad 2 | Fecha de entrega: 27/10/2025</small></p>
              <a href="https://drive.google.com/drive/folders/1NKQRRrO1beVoy0BNi85wiyQS3dc5Wgk7?usp=sharing" className="btn btn-primary stretched-link">Ver Proyecto</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card work-card h-100">
            <div className="card-body">
              <h5 className="card-title">Proyecto 2: Modelos de Regresión Espacial</h5>
              <p className="card-text">Desarrollo de modelos de regresión que incorporan dependencia espacial.</p>
              <p className="text-muted"><small>Unidad 2 | Fecha de entrega: 10/11/2025</small></p>
              <a href="https://drive.google.com/drive/folders/1NKQRRrO1beVoy0BNi85wiyQS3dc5Wgk7?usp=sharing" className="btn btn-primary stretched-link">Ver Proyecto</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card work-card h-100">
            <div className="card-body">
              <h5 className="card-title">Proyecto Final: Análisis Integral</h5>
              <p className="card-text">Aplicación integral de técnicas de estadística espacial a un problema real.</p>
              <p className="text-muted"><small>Unidad 3-4 | Fecha de entrega: 08/12/2025</small></p>
              <a href="https://drive.google.com/drive/folders/1NKQRRrO1beVoy0BNi85wiyQS3dc5Wgk7?usp=sharing" className="btn btn-primary stretched-link">Ver Proyecto</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Trabajos;
