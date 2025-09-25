import React from 'react';

const InfoCurso = () => (
  <section className="py-5">
    <div className="container">
      <h2 className="section-title text-center">Información del Curso</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Detalles Académicos</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Curso:</strong> Estadística Espacial</li>
                <li className="list-group-item"><strong>Código:</strong> EST334</li>
                <li className="list-group-item"><strong>Prerrequisito:</strong> EST327 - Seguridad y Auditoría Informática</li>
                <li className="list-group-item"><strong>Horas:</strong> 4h teóricas, 2h prácticas (Total: 6 horas)</li>
                <li className="list-group-item"><strong>Créditos:</strong> 5</li>
                <li className="list-group-item"><strong>Semestre:</strong> 2025-II</li>
                <li className="list-group-item"><strong>Duración:</strong> 25 Agosto - 19 Diciembre 2025 (17 semanas)</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Objetivos del Curso</h5>
              <p>Al finalizar el curso, el estudiante será capaz de:</p>
              <ul>
                <li>Comprender los fundamentos de la estadística espacial</li>
                <li>Aplicar técnicas de análisis geoespacial a problemas reales</li>
                <li>Utilizar herramientas informáticas para el análisis de datos espaciales</li>
                <li>Interpretar y visualizar resultados de análisis espaciales</li>
                <li>Desarrollar modelos predictivos basados en datos geoespaciales</li>
              </ul>
              <div className="progress mt-4">
                <div className="progress-bar" role="progressbar" style={{width: '75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                  Progreso del semestre: 75%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default InfoCurso;
