import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import Chart from 'chart.js/auto';

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
        zoom: 6,
        zoomControl: false,
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(mapRef.current);
    }
    // Limpiar círculos anteriores
    circlesRef.current.forEach(c => c.remove());
    circlesRef.current = [];
    // Simular puntos de calor
    const points = Array.from({ length: 100 }, () => [
      -12 + Math.random() * 2,
      -77 + Math.random() * 2,
    ]);
    points.forEach(([lat, lng]) => {
      const circle = L.circle([lat, lng], {
        color: '#3498db',
        fillColor: '#3498db',
        fillOpacity: 0.3,
        radius: 2000 + Math.random() * 2000,
      }).addTo(mapRef.current);
      circlesRef.current.push(circle);
    });
    // Limpiar al desmontar
    return () => {
      circlesRef.current.forEach(c => c.remove());
      // No destruir el mapa para evitar errores
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
          borderColor: '#e74c3c',
          backgroundColor: 'rgba(231,76,60,0.2)',
        }],
      },
      options: { responsive: true, plugins: { legend: { display: false } } },
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
          backgroundColor: '#3498db',
        }],
      },
      options: { responsive: true, plugins: { legend: { display: false } } },
    });
  }, [heatmapVar, moranVar]);

  return (
    <section id="mapas" className="py-5 bg-light">
      <div className="container">
        <h2 className="section-title text-center">Mapas Interactivos y Geoestadística</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Mapa de Calor de Densidad Poblacional</h5>
                <div id="heatmap" style={{ height: 400, width: '100%', borderRadius: 8 }}></div>
                <div className="mt-3">
                  <label htmlFor="heatmapVariable" className="form-label">Variable a visualizar:</label>
                  <select className="form-select" id="heatmapVariable" value={heatmapVar} onChange={e => setHeatmapVar(e.target.value)}>
                    <option value="poblacion">Densidad Poblacional</option>
                    <option value="temperatura">Temperatura Promedio</option>
                    <option value="precipitacion">Precipitación Anual</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Variograma Experimental</h5>
                <canvas id="variogramChart" height="300"></canvas>
                <div className="mt-3">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => setHeatmapVar(heatmapVar)}>Generar Nuevo Variograma</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Análisis de Autocorrelación Espacial (I de Moran)</h5>
                <div className="row">
                  <div className="col-md-8">
                    <canvas id="moranChart" height="300"></canvas>
                  </div>
                  <div className="col-md-4">
                    <h6>Interpretación:</h6>
                    <p id="moranInterpretation">El diagrama de dispersión de Moran muestra la relación entre los valores de una variable y sus valores vecinos.</p>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mapas;
