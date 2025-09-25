import React, { useState } from 'react';

const unidades = [
  {
    key: 'unidad1',
    titulo: 'Unidad 1: Fundamentos de Estadística Espacial',
    contenido: (
      <>
        <h5 className="mt-4 mb-2 text-primary">Contenido Teórico</h5>
        <ul className="text-start mx-auto" style={{ maxWidth: 600 }}>
          <li>Introducción a los datos espaciales y sus características</li>
          <li>Conceptos básicos de geoestadística</li>
          <li>Sistemas de coordenadas y proyecciones cartográficas</li>
          <li>Autocorrelación espacial: concepto y medición</li>
          <li>La Primera Ley de la Geografía de Tobler</li>
          <li>Tipos de datos espaciales: puntuales, areales y de red</li>
          <li>Estacionariedad e hipótesis de isotropía</li>
        </ul>
        <h5 className="mt-4 mb-2 text-success">Contenido Práctico</h5>
        <ul className="text-start mx-auto" style={{ maxWidth: 600 }}>
          <li>Manejo de datos espaciales en R/Python</li>
          <li>Visualización básica de datos geoespaciales</li>
          <li>Introducción a los Sistemas de Información Geográfica (SIG)</li>
          <li>Análisis de patrones de puntos</li>
          <li>Técnicas de muestreo espacial</li>
        </ul>
      </>
    ),
  },
  {
    key: 'unidad2',
    titulo: 'Unidad 2: Análisis Exploratorio de Datos Espaciales',
    contenido: (
      <>
        <h5 className="mt-4 mb-2 text-primary">Contenido Teórico</h5>
        <ul className="text-start mx-auto" style={{ maxWidth: 600 }}>
          <li>Visualización avanzada de datos espaciales</li>
          <li>Medidas de autocorrelación espacial (I de Moran, Geary's C)</li>
          <li>Análisis de patrones de puntos: K-función, L-función</li>
          <li>Mapas de calor (heatmaps) y coropletas (choropleth maps)</li>
          <li>Análisis de clusters espaciales: scan statistics</li>
          <li>Detección de valores atípicos espaciales</li>
          <li>Análisis de heterogeneidad espacial</li>
        </ul>
        <h5 className="mt-4 mb-2 text-success">Contenido Práctico</h5>
        <ul className="text-start mx-auto" style={{ maxWidth: 600 }}>
          <li>Cálculo e interpretación del Índice de Moran</li>
          <li>Creación de mapas temáticos y coropletas</li>
          <li>Análisis de patrones de puntos con software especializado</li>
          <li>Detección de clusters espaciales con métodos estadísticos</li>
          <li>Análisis de autocorrelación espacial local (LISA)</li>
        </ul>
      </>
    ),
  },
];

const Temario = () => {
  const [activeTab, setActiveTab] = useState('unidad1');

  return (
    <section id="temario" className="py-5 bg-light">
      <div className="container">
        <h2 className="section-title text-center">Temario del Curso</h2>
        <ul className="nav nav-tabs justify-content-center mb-4" id="temarioTabs" role="tablist">
          {unidades.map((unidad) => (
            <li className="nav-item" role="presentation" key={unidad.key}>
              <button
                className={`nav-link${activeTab === unidad.key ? ' active' : ''}`}
                id={`${unidad.key}-tab`}
                type="button"
                role="tab"
                aria-selected={activeTab === unidad.key}
                onClick={() => setActiveTab(unidad.key)}
                style={{ minWidth: 220 }}
              >
                {unidad.titulo}
              </button>
            </li>
          ))}
        </ul>
        <div className="tab-content text-center" id="temarioContent">
          {unidades.map((unidad) => (
            <div
              key={unidad.key}
              className={`tab-pane fade${activeTab === unidad.key ? ' show active' : ''}`}
              id={unidad.key}
              role="tabpanel"
            >
              <h4 className="fw-bold text-primary mb-4">{unidad.titulo}</h4>
              {unidad.contenido}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Temario;
