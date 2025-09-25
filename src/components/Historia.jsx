import React, { useState } from 'react';

const imagenes = [
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/John_Snow%27s_cholera_map.jpg',
    alt: 'Mapa de John Snow sobre el cólera',
    leyenda: 'Mapa de John Snow (1854): pionero en análisis espacial de epidemias.'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Geostatistics_kriging_example.png',
    alt: 'Ejemplo de krigeaje en geoestadística',
    leyenda: 'Ejemplo de krigeaje: técnica fundamental en geoestadística.'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/GIS_layers.png',
    alt: 'Capas en un SIG',
    leyenda: 'Capas de información en un Sistema de Información Geográfica (SIG).'
  }
];

const Historia = () => {
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <section id="historia" className="py-5 bg-light">
      <div className="container">
        <h2 className="section-title text-center">Historia y Fundamentos de la Estadística Espacial</h2>
        <div className="row g-4 align-items-stretch">
          <div className="col-md-6 d-flex flex-column gap-4">
            <div className="card flex-fill animate__animated animate__fadeInLeft">
              <div className="card-body">
                <h5 className="card-title">¿Qué es la Estadística Espacial?</h5>
                <p>La estadística espacial es una rama de la estadística que se ocupa del análisis de datos con ubicación geográfica. Permite identificar patrones, relaciones y tendencias en el espacio, integrando métodos estadísticos y geoespaciales.</p>
                <ul>
                  <li><strong>Dependencia espacial:</strong> Los valores cercanos tienden a ser más similares (Primera Ley de Tobler).</li>
                  <li><strong>Tipos de datos:</strong> Puntuales (eventos), areales (zonas), de red (rutas).</li>
                  <li><strong>Herramientas:</strong> Geoestadística, SIG, análisis de patrones de puntos.</li>
                </ul>
                <p className="mb-0">La estadística espacial es clave en la era del Big Data y la geolocalización.</p>
              </div>
            </div>
            <div className="card flex-fill animate__animated animate__fadeInLeft animate__delay-1s">
              <div className="card-body">
                <h5 className="card-title">Aplicaciones Prácticas</h5>
                <ul>
                  <li><strong>Salud Pública:</strong> Detección de focos epidémicos y propagación de enfermedades.</li>
                  <li><strong>Medio Ambiente:</strong> Monitoreo de contaminación, biodiversidad y recursos naturales.</li>
                  <li><strong>Economía:</strong> Análisis de mercados, ubicación óptima de negocios y logística.</li>
                  <li><strong>Agricultura:</strong> Agricultura de precisión y gestión de suelos.</li>
                  <li><strong>Urbanismo:</strong> Planificación urbana, transporte y seguridad.</li>
                  <li><strong>Geología:</strong> Exploración minera y riesgos naturales.</li>
                </ul>
                <p className="text-muted small mb-0">La estadística espacial impacta múltiples disciplinas y la toma de decisiones basada en datos geográficos.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column gap-4">
            <div className="card flex-fill animate__animated animate__fadeInRight">
              <div className="card-body">
                <h5 className="card-title">Evolución Histórica</h5>
                <div className="timeline">
                  <div className="timeline-item">
                    <h6>Siglo XIX - Primeros desarrollos</h6>
                    <p>Francis Galton y Karl Pearson sientan bases para correlaciones y regresiones espaciales.</p>
                  </div>
                  <div className="timeline-item">
                    <h6>1854 - John Snow y el cólera</h6>
                    <p>Primer mapa epidemiológico espacial en Londres, origen de la epidemiología moderna.</p>
                  </div>
                  <div className="timeline-item">
                    <h6>1950s - Nacimiento de la Geoestadística</h6>
                    <p>Daniel Krige desarrolla el krigeaje para estimar reservas mineras en Sudáfrica.</p>
                  </div>
                  <div className="timeline-item">
                    <h6>1960s-1970s - Formalización teórica</h6>
                    <p>Georges Matheron formaliza la teoría de variables regionalizadas y el krigeaje.</p>
                  </div>
                  <div className="timeline-item">
                    <h6>1980s-1990s - Expansión y software</h6>
                    <p>Surge software especializado y aplicaciones en ecología, epidemiología y ciencias sociales.</p>
                  </div>
                  <div className="timeline-item">
                    <h6>2000s-Presente - SIG y Big Data</h6>
                    <p>Integración con SIG y análisis de grandes volúmenes de datos geoespaciales.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card flex-fill animate__animated animate__fadeInRight animate__delay-1s">
              <div className="card-body text-center">
                <h5 className="card-title">Galería de la Estadística Espacial</h5>
                <img
                  src={imagenes[imgIndex].url}
                  alt={imagenes[imgIndex].alt}
                  className="img-fluid rounded shadow mb-2"
                  style={{maxHeight: 220, objectFit: 'cover'}}
                />
                <div className="mb-2 text-muted small">{imagenes[imgIndex].leyenda}</div>
                <div>
                  <button className="btn btn-outline-primary btn-sm me-2" onClick={() => setImgIndex((imgIndex-1+imagenes.length)%imagenes.length)}>
                    &#8592; Anterior
                  </button>
                  <button className="btn btn-outline-primary btn-sm" onClick={() => setImgIndex((imgIndex+1)%imagenes.length)}>
                    Siguiente &#8594;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Historia;
