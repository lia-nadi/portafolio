import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import Chart from 'chart.js/auto';
import 'leaflet/dist/leaflet.css';

const interpretaciones = {
  poblacion: 'La densidad poblacional muestra cómo se distribuyen las personas en el territorio. Observa las zonas más densas y reflexiona sobre sus causas.',
  temperatura: 'La temperatura promedio revela patrones climáticos. Las zonas cálidas y frías pueden influir en la vida y actividades de la región.',
  precipitacion: 'La precipitación anual ayuda a entender la disponibilidad de agua y posibles riesgos de sequía o inundación.',
  ingresos: 'Los ingresos familiares reflejan el bienestar económico. Busca agrupamientos y desigualdades espaciales.',
  educacion: 'El nivel educativo puede estar relacionado con oportunidades y desarrollo local.',
  vivienda: 'La calidad de vivienda indica condiciones de vida y posibles focos de vulnerabilidad.'
};

const Mapas = () => {
  const mapRef = useRef(null);
  const circlesRef = useRef([]);
  const variogramRef = useRef(null);
  const moranRef = useRef(null);
  const [heatmapVar, setHeatmapVar] = useState('poblacion');
  const [moranVar, setMoranVar] = useState('ingresos');

  useEffect(() => {
    // Inicializar Leaflet solo una vez
    if (!mapRef.current) {
      mapRef.current = L.map('heatmap', {
        center: [-12.05, -77.05],
        zoom: 7,
        zoomControl: true,
        attributionControl: false,
      });
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap, Humanitarian',
      }).addTo(mapRef.current);
    }
    // Limpiar círculos anteriores
    circlesRef.current.forEach(c => c.remove());
    circlesRef.current = [];
    // Simular puntos de calor con iconos y animaciones
    const icon = L.divIcon({
      className: 'custom-marker',
      html: '<div style="background:#3498db;border-radius:50%;width:18px;height:18px;box-shadow:0 0 12px #3498db;animation: pulse 1.2s infinite"></div>',
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });
    const points = Array.from({ length: 100 }, () => [
      -12 + Math.random() * 2,
      -77 + Math.random() * 2,
    ]);
    points.forEach(([lat, lng]) => {
      const marker = L.marker([lat, lng], { icon }).addTo(mapRef.current);
      circlesRef.current.push(marker);
    });
    // Limpiar al desmontar
    return () => {
      circlesRef.current.forEach(c => c.remove());
    };
  }, [heatmapVar]);

  useEffect(() => {
    // Variograma
    if (variogramRef.current) variogramRef.current.destroy();
    const ctx = document.getElementById('variogramChart').getContext('2d');
    variogramRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 10 }, (_, i) => i + 1),
        datasets: [{
          label: 'Semivarianza',
          data: Array.from({ length: 10 }, () => Math.random() * 10),
          borderColor: 'rgba(52,152,219,1)',
          backgroundColor: 'rgba(52,152,219,0.2)',
          pointBackgroundColor: 'rgba(231,76,60,1)',
          pointRadius: 6,
          fill: true,
          tension: 0.4,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: { enabled: true },
        },
        animation: { duration: 1200 },
        scales: {
          x: { title: { display: true, text: 'Lag' } },
          y: { title: { display: true, text: 'Semivarianza' } },
        },
      },
    });
    // Moran
    if (moranRef.current) moranRef.current.destroy();
    const ctx2 = document.getElementById('moranChart').getContext('2d');
    moranRef.current = new Chart(ctx2, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Moran',
          data: Array.from({ length: 30 }, () => ({ x: Math.random() * 10, y: Math.random() * 10 })),
          backgroundColor: 'rgba(46,204,113,0.7)',
          pointRadius: 7,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: { enabled: true },
        },
        animation: { duration: 1200 },
        scales: {
          x: { title: { display: true, text: 'Valor' } },
          y: { title: { display: true, text: 'Valor vecino' } },
        },
      },
    });
  }, [heatmapVar, moranVar]);

  return (
    <section id="mapas" className="py-5 bg-light">
      <div className="container">
        <h2 className="section-title text-center">Mapas Interactivos y Geoestadística</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="card shadow-lg animate__animated animate__fadeInLeft">
              <div className="card-body">
                <h5 className="card-title">Mapa de Calor Dinámico</h5>
                <div id="heatmap" style={{ height: 400, width: '100%', borderRadius: 12, boxShadow: '0 0 24px #3498db33' }}></div>
                <div className="mt-3">
                  <label htmlFor="heatmapVariable" className="form-label">Variable a visualizar:</label>
                  <select className="form-select" id="heatmapVariable" value={heatmapVar} onChange={e => setHeatmapVar(e.target.value)}>
                    <option value="poblacion">Densidad Poblacional</option>
                    <option value="temperatura">Temperatura Promedio</option>
                    <option value="precipitacion">Precipitación Anual</option>
                  </select>
                  <div className="mt-2 text-secondary animate__animated animate__fadeInUp" style={{fontSize:'0.98em'}}>
                    <b>Interpretación:</b> {interpretaciones[heatmapVar]}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-lg animate__animated animate__fadeInRight">
              <div className="card-body">
                <h5 className="card-title">Variograma Experimental</h5>
                <canvas id="variogramChart" height="300"></canvas>
                <div className="mt-3 text-secondary animate__animated animate__fadeInUp" style={{fontSize:'0.98em'}}>
                  <b>¿Qué significa?</b> El variograma muestra cómo varía la similitud entre puntos según la distancia. Busca patrones y agrupamientos.
                </div>
                <div className="mt-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => setHeatmapVar(heatmapVar)}>
                    <i className="fas fa-sync"></i> Generar Nuevo Variograma
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <div className="card shadow-lg animate__animated animate__fadeInUp">
              <div className="card-body">
                <h5 className="card-title">Análisis de Autocorrelación Espacial (I de Moran)</h5>
                <div className="row">
                  <div className="col-md-8">
                    <canvas id="moranChart" height="300"></canvas>
                  </div>
                  <div className="col-md-4">
                    <h6>Interpretación:</h6>
                    <p id="moranInterpretation">{interpretaciones[moranVar]}</p>
                    <div className="mb-2">
                      <label htmlFor="moranVariable" className="form-label">Variable:</label>
                      <select className="form-select" id="moranVariable" value={moranVar} onChange={e => setMoranVar(e.target.value)}>
                        <option value="ingresos">Ingresos Familiares</option>
                        <option value="educacion">Nivel Educativo</option>
                        <option value="vivienda">Calidad de Vivienda</option>
                      </select>
                    </div>
                    <p><strong>I de Moran:</strong> <span id="moranValue">{(Math.random() * 2 - 1).toFixed(2)}</span></p>
                    <p><strong>Significancia:</strong> <span id="moranSignificance">p = {(Math.random() * 0.05).toFixed(2)}</span></p>
                    <div className="mt-2 text-info animate__animated animate__fadeInUp" style={{fontSize:'0.97em'}}>
                      <b>Tip:</b> Un valor alto y significativo indica agrupamiento espacial. Explora cómo cambian los patrones según la variable.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Animación para los puntos del mapa */}
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 #3498db88; }
          70% { box-shadow: 0 0 24px 12px #3498db44; }
          100% { box-shadow: 0 0 0 0 #3498db88; }
        }
        .custom-marker { z-index: 500; }
      `}</style>
    </section>
  );
};

export default Mapas;
