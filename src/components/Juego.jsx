import React, { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import 'animate.css/animate.min.css';

// SVG navecita y astronauta
const NaveSVG = ({ x, y, selected, scale }) => (
  <g transform={`translate(${x},${y}) scale(${scale})`}>
    <ellipse cx={0} cy={0} rx={10} ry={6} fill={selected ? '#ffeb3b' : '#2196f3'} stroke="#fff" strokeWidth={2} />
    <rect x={-4} y={-10} width={8} height={8} fill="#fff" stroke="#2196f3" strokeWidth={1} />
    <circle cx={0} cy={-6} r={2.5} fill="#e91e63" />
  </g>
);
const AstronautSVG = ({ x, y, scale }) => (
  <g transform={`translate(${x},${y}) scale(${scale})`}>
    <circle cx={0} cy={0} r={10} fill="#fff" stroke="#ff9800" strokeWidth={3} />
    <circle cx={0} cy={-4} r={4} fill="#90caf9" />
    <rect x={-3} y={2} width={6} height={6} fill="#ff9800" />
  </g>
);
const PlanetSVG = ({ x, y, r, color }) => (
  <g transform={`translate(${x},${y})`}>
    <ellipse cx={0} cy={0} rx={r*1.2} ry={r} fill={color} opacity={0.7} />
    <circle cx={r*0.7} cy={-r*0.3} r={r*0.3} fill="#fff" opacity={0.3} />
  </g>
);

// Algoritmos geoestadísticos profesionales
const GeoestadisticalUtils = {
  // Calcula el semivariograma experimental
  calculateSemivariogram: (points, lagDistance, maxLag) => {
    const semivariogram = [];
    const lags = Math.floor(maxLag / lagDistance);
    for (let lag = 0; lag <= lags; lag++) {
      const currentLag = lag * lagDistance;
      let sum = 0;
      let pairs = 0;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const distance = Math.sqrt(
            Math.pow(points[i].x - points[j].x, 2) + 
            Math.pow(points[i].y - points[j].y, 2)
          );
          if (distance >= currentLag - lagDistance/2 && distance < currentLag + lagDistance/2) {
            sum += Math.pow(points[i].value - points[j].value, 2);
            pairs++;
          }
        }
      }
      if (pairs > 0) {
        semivariogram.push({
          lag: currentLag,
          gamma: sum / (2 * pairs),
          pairs: pairs
        });
      }
    }
    return semivariogram;
  },
  // Algoritmo K-means para clustering
  kMeansClustering: (points, k, maxIterations = 100) => {
    if (points.length === 0) return { clusters: [], centroids: [] };
    let centroids = Array.from({ length: k }, () => ({
      x: Math.random() * 400,
      y: Math.random() * 400
    }));
    let clusters = [];
    let changed = true;
    let iterations = 0;
    while (changed && iterations < maxIterations) {
      clusters = points.map(point => {
        let minDistance = Infinity;
        let clusterIndex = 0;
        centroids.forEach((centroid, idx) => {
          const distance = Math.sqrt(
            Math.pow(point.x - centroid.x, 2) + 
            Math.pow(point.y - centroid.y, 2)
          );
          if (distance < minDistance) {
            minDistance = distance;
            clusterIndex = idx;
          }
        });
        return { ...point, cluster: clusterIndex };
      });
      const newCentroids = Array.from({ length: k }, () => ({ x: 0, y: 0, count: 0 }));
      clusters.forEach(point => {
        newCentroids[point.cluster].x += point.x;
        newCentroids[point.cluster].y += point.y;
        newCentroids[point.cluster].count++;
      });
      changed = false;
      newCentroids.forEach((centroid, idx) => {
        if (centroid.count > 0) {
          const newX = centroid.x / centroid.count;
          const newY = centroid.y / centroid.count;
          if (Math.abs(newX - centroids[idx].x) > 0.1 || 
              Math.abs(newY - centroids[idx].y) > 0.1) {
            changed = true;
          }
          centroids[idx] = { x: newX, y: newY };
        }
      });
      iterations++;
    }
    return { clusters, centroids: centroids.filter(c => !isNaN(c.x)) };
  },
  // Calcula densidad kernel
  calculateKernelDensity: (points, bandwidth, gridSize) => {
    const density = [];
    const cellSize = 400 / gridSize;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = i * cellSize + cellSize / 2;
        const y = j * cellSize + cellSize / 2;
        let densityValue = 0;
        points.forEach(point => {
          const distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2));
          densityValue += Math.exp(-0.5 * Math.pow(distance / bandwidth, 2));
        });
        density.push({ x, y, value: densityValue });
      }
    }
    return density;
  }
};

const generateSpatialData = (config) => {
  const { patternType, pointCount, clusters, noiseLevel } = config;
  let points = [];
  switch (patternType) {
    case 'clustered': {
      const clusterCenters = Array.from({ length: clusters }, () => ({
        x: Math.random() * 360 + 20,
        y: Math.random() * 360 + 20
      }));
      clusterCenters.forEach(center => {
        for (let i = 0; i < pointCount / clusters; i++) {
          const angle = Math.random() * 2 * Math.PI;
          const radius = Math.random() * 50;
          points.push({
            x: center.x + Math.cos(angle) * radius,
            y: center.y + Math.sin(angle) * radius,
            value: Math.random() * 100,
            cluster: clusterCenters.indexOf(center)
          });
        }
      });
      break;
    }
    case 'dispersed': {
      const rows = Math.sqrt(pointCount);
      const cols = Math.sqrt(pointCount);
      const spacing = 350 / Math.max(rows, cols);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = 25 + j * spacing + (i % 2) * spacing / 2;
          const y = 25 + i * spacing * 0.866;
          if (x < 375 && y < 375) {
            points.push({
              x: x + (Math.random() - 0.5) * spacing * noiseLevel,
              y: y + (Math.random() - 0.5) * spacing * noiseLevel,
              value: Math.random() * 100
            });
          }
        }
      }
      break;
    }
    case 'random':
    default: {
      points = Array.from({ length: pointCount }, () => ({
        x: Math.random() * 380 + 10,
        y: Math.random() * 380 + 10,
        value: Math.random() * 100
      }));
      break;
    }
  }
  return points;
};

const conceptos = [
  {
    nombre: 'Semivariograma',
    explicacion: '¡El semivariograma es como una lupa mágica! Nos ayuda a ver si los puntos cercanos se parecen o son diferentes. Así descubrimos patrones ocultos en el mapa.'
  },
  {
    nombre: 'Clustering Espacial',
    explicacion: 'El clustering es como juntar amigos en grupos. El algoritmo K-means busca los grupos naturales de puntos en el espacio.'
  },
  {
    nombre: 'Densidad Kernel',
    explicacion: 'La densidad kernel es como pintar zonas calientes en el mapa. Nos muestra dónde hay más puntos y dónde hay menos.'
  },
  {
    nombre: 'Autocorrelación',
    explicacion: 'La autocorrelación es la tendencia de que los puntos cercanos sean parecidos. ¡Como vecinos que se parecen entre sí!'
  }
];

const JuegoGeoestadistico = () => {
  const [config, setConfig] = useState({
    patternType: 'clustered',
    pointCount: 100,
    clusters: 3,
    noiseLevel: 0.2,
    analysisType: 'semivariogram'
  });
  const [points, setPoints] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showConcepto, setShowConcepto] = useState(null);
  const [placingMode, setPlacingMode] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const width = 900, height = 600;

  useEffect(() => {
    generateNewData();
    // eslint-disable-next-line
  }, [config.patternType, config.pointCount, config.clusters, config.noiseLevel]);

  const generateNewData = () => {
    const newPoints = generateSpatialData(config);
    setPoints(newPoints);
    setAnalysisResults(null);
    setSelectedPoints([]);
  };

  const performAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      let results = {};
      switch (config.analysisType) {
        case 'semivariogram': {
          results = {
            type: 'semivariogram',
            data: GeoestadisticalUtils.calculateSemivariogram(points, 20, 200)
          };
          break;
        }
        case 'clustering': {
          const clusteringResult = GeoestadisticalUtils.kMeansClustering(points, config.clusters);
          results = {
            type: 'clustering',
            data: clusteringResult
          };
          setPoints(clusteringResult.clusters);
          break;
        }
        case 'density': {
          results = {
            type: 'density',
            data: GeoestadisticalUtils.calculateKernelDensity(points, 30, 20)
          };
          break;
        }
        default: {
          break;
        }
      }
      setAnalysisResults(results);
      setIsAnalyzing(false);
    }, 500);
  };

  const handlePointClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    let minDistance = Infinity;
    let closestPoint = null;
    points.forEach(point => {
      const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
      if (distance < 10 && distance < minDistance) {
        minDistance = distance;
        closestPoint = point;
      }
    });
    if (closestPoint) {
      setSelectedPoints(prev => 
        prev.includes(closestPoint) 
          ? prev.filter(p => p !== closestPoint)
          : [...prev, closestPoint]
      );
    }
  };

  // Permitir al usuario colocar navecitas con click en el área de juego
  const handleGameAreaClick = (e) => {
    if (!placingMode) return;
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPoints(prev => ([...prev, { x, y, value: Math.random()*100 }]));
  };

  // Seleccionar navecita al hacer click
  const handleNaveClick = (idx, e) => {
    e.stopPropagation();
    setSelectedPoints(prev =>
      prev.includes(points[idx])
        ? prev.filter(p => p !== points[idx])
        : [...prev, points[idx]]
    );
  };

  // Drag & drop de navecitas
  const handleNaveMouseDown = (idx, e) => {
    e.stopPropagation();
    setDraggedIndex(idx);
  };
  const handleGameAreaMouseMove = (e) => {
    if (draggedIndex === null) return;
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPoints(prev => prev.map((pt, i) => i === draggedIndex ? { ...pt, x, y } : pt));
  };
  const handleGameAreaMouseUp = () => {
    setDraggedIndex(null);
  };

  const renderAnalysisResults = () => {
    if (!analysisResults) return null;
    switch (analysisResults.type) {
      case 'semivariogram':
        return (
          <div className="mt-3">
            <h6>Semivariograma Experimental</h6>
            <div style={{ height: '260px', border: '1px solid #ddd', borderRadius: 12, background: '#f8fafc', boxShadow: '0 2px 8px #e0e7ef', padding: '16px', overflowY: 'auto' }}>
              <p className="mb-2 fw-bold text-secondary">Lag vs Semivarianza</p>
              <table className="table table-sm table-bordered align-middle mb-0" style={{background:'#fff',borderRadius:8}}>
                <thead className="table-light">
                  <tr>
                    <th>Lag</th>
                    <th>γ</th>
                    <th>Pares</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisResults.data.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.lag.toFixed(1)}</td>
                      <td>{item.gamma.toFixed(2)}</td>
                      <td>{item.pairs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'clustering':
        return (
          <div className="mt-3">
            <h6>Resultados de Clustering K-means</h6>
            <div style={{border:'1px solid #e0e7ef',borderRadius:12,background:'#f8fafc',boxShadow:'0 2px 8px #e0e7ef',padding:'16px'}}>
              <p className="mb-2 fw-bold text-secondary">Centroides encontrados: {analysisResults.data.centroids.length}</p>
              <table className="table table-sm table-bordered align-middle mb-0" style={{background:'#fff',borderRadius:8}}>
                <thead className="table-light">
                  <tr>
                    <th>Cluster</th>
                    <th>X</th>
                    <th>Y</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisResults.data.centroids.map((centroid, idx) => (
                    <tr key={idx}>
                      <td>{idx+1}</td>
                      <td>{centroid.x.toFixed(1)}</td>
                      <td>{centroid.y.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'density':
        return (
          <div className="mt-3">
            <h6>Mapa de Densidad Kernel</h6>
            <div style={{border:'1px solid #e0e7ef',borderRadius:12,background:'#f8fafc',boxShadow:'0 2px 8px #e0e7ef',padding:'16px'}}>
              <p className="mb-2 fw-bold text-secondary">Puntos de densidad calculados: {analysisResults.data.length}</p>
              <button 
                className="btn btn-sm btn-outline-primary"
                onClick={() => setShowHeatmap(!showHeatmap)}
              >
                {showHeatmap ? 'Ocultar' : 'Mostrar'} Heatmap
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderBackground = () => (
    <g>
      {[...Array(80)].map((_, i) => (
        <circle key={i} cx={Math.random()*width} cy={Math.random()*height} r={Math.random()*2+1} fill="#fff" opacity={0.7} />
      ))}
      <PlanetSVG x={width*0.15} y={height*0.2} r={40} color="#ffd700" />
      <PlanetSVG x={width*0.8} y={height*0.7} r={60} color="#e91e63" />
      <PlanetSVG x={width*0.5} y={height*0.4} r={30} color="#1abc9c" />
      {/* Cometas animados */}
      <ellipse cx={width*0.3} cy={height*0.8} rx={18} ry={6} fill="#fff" opacity={0.4} />
      <ellipse cx={width*0.7} cy={height*0.1} rx={12} ry={4} fill="#fff" opacity={0.3} />
    </g>
  );

  return (
    <section id="juego-geoestadistico" className="py-5" style={{marginTop: '80px'}}>
      <div className="container-fluid px-0">
        <h2 className="section-title text-center mb-4">Laboratorio Espacial Interactivo</h2>
        {/* Panel de instrucciones */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-10">
            <div className="alert alert-info animate__animated animate__fadeInDown" style={{borderRadius:16, boxShadow:'0 2px 16px #e0e7ef'}}>
              <h5 className="mb-2"><span role="img" aria-label="rocket">🚀</span> ¿Cómo jugar y aprender?</h5>
              <ul className="mb-2" style={{fontSize:'1.05em'}}>
                <li><b>Coloca navecitas:</b> Activa el modo "Colocar navecitas" y haz clic en el área espacial para agregar puntos.</li>
                <li><b>Selecciona y mueve:</b> Haz clic en una navecita para seleccionarla. Mantén presionado y arrastra para moverla por el espacio.</li>
                <li><b>Explora los controles:</b> Usa los botones flotantes para hacer zoom, resetear la vista o cambiar el modo de juego.</li>
                <li><b>Configura tu misión:</b> Ajusta el patrón espacial, número de puntos y grupos en el panel derecho.</li>
                <li><b>Analiza el espacio:</b> Elige el tipo de análisis y presiona "¡Analizar!" para descubrir patrones espaciales.</li>
                <li><b>Aprende conceptos:</b> Consulta los conceptos espaciales al final para entender cada herramienta.</li>
              </ul>
              <div className="text-secondary" style={{fontSize:'0.98em'}}>
                <span role="img" aria-label="star">🌟</span> ¡Experimenta, juega y aprende sobre estadística espacial de forma interactiva!
              </div>
            </div>
          </div>
        </div>
        <div className="row g-0">
          <div className="col-lg-8 position-relative">
            {/* Controles flotantes de zoom y modo colocar navecitas */}
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={2.5}
              wheel={{ step: 0.1 }}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <div style={{position:'absolute',top:16,right:16,zIndex:10,display:'flex',gap:'8px'}}>
                    <button className={`btn btn-sm btn-primary animate__animated animate__pulse animate__infinite${placingMode ? ' active' : ''}`} onClick={e => {e.stopPropagation(); setPlacingMode(m => !m);}} title="Colocar navecitas">
                      <i className="fas fa-mouse-pointer"></i> {placingMode ? 'Colocando...' : 'Colocar navecitas'}
                    </button>
                    <button className="btn btn-sm btn-primary animate__animated animate__pulse animate__infinite" onClick={e => {e.stopPropagation(); zoomIn();}} title="Zoom In"><i className="fas fa-search-plus"></i></button>
                    <button className="btn btn-sm btn-primary animate__animated animate__pulse animate__infinite" onClick={e => {e.stopPropagation(); zoomOut();}} title="Zoom Out"><i className="fas fa-search-minus"></i></button>
                    <button className="btn btn-sm btn-secondary animate__animated animate__pulse animate__infinite" onClick={e => {e.stopPropagation(); resetTransform();}} title="Reset Zoom"><i className="fas fa-sync"></i></button>
                  </div>
                  <TransformComponent>
                    <div
                      id="gameArea"
                      style={{ 
                        height: height, width: width, maxWidth: '100%',
                        background: 'radial-gradient(circle at 60% 40%, #0d47a1 60%, #1a237e 100%)',
                        borderRadius: 24, position: 'relative', overflow: 'hidden', cursor: placingMode ? 'crosshair' : 'grab',
                        border: '6px solid #ffd700', boxShadow: '0 0 48px #ffe066', margin: 'auto'
                      }}
                      onClick={handleGameAreaClick}
                      onMouseMove={handleGameAreaMouseMove}
                      onMouseUp={handleGameAreaMouseUp}
                    >
                      <svg width={width} height={height} style={{ display: 'block' }}>
                        {renderBackground()}
                        {/* Animación de navecitas flotando, seleccionables y movibles */}
                        {points.map((point, i) => (
                          <g key={i}
                            onClick={e => handleNaveClick(i, e)}
                            onMouseDown={e => handleNaveMouseDown(i, e)}
                            style={{ cursor: 'pointer' }}
                          >
                            <NaveSVG x={point.x} y={point.y} selected={selectedPoints.includes(point)} scale={1} />
                          </g>
                        ))}
                        {/* Centroides como astronautas animados */}
                        {analysisResults?.type === 'clustering' && 
                         analysisResults.data.centroids.map((centroid, i) => (
                          <AstronautSVG key={i} x={centroid.x} y={centroid.y} scale={1.2} />
                        ))}
                        {/* Heatmap de densidad */}
                        {showHeatmap && analysisResults?.type === 'density' && 
                         analysisResults.data.map((cell, i) => (
                          <rect
                            key={i}
                            x={cell.x - 10}
                            y={cell.y - 10}
                            width={20}
                            height={20}
                            fill={`rgba(255, 99, 132, ${cell.value / 10})`}
                            opacity={0.7}
                            className="animate__animated animate__fadeIn"
                          />
                        ))}
                      </svg>
                      {isAnalyzing && (
                        <div style={{
                          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: 'rgba(255,255,255,0.8)', fontSize: 32, fontWeight: 700,
                          color: '#ff9800', animation: 'pulse 1s infinite', zIndex: 2
                        }}>
                          🚀 ¡Analizando datos mágicos!
                        </div>
                      )}
                    </div>
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
            {/* Estadísticas básicas */}
            <div className="row mt-2 text-center">
              <div className="col-4">
                <small className="text-primary">Navecitas: {points.length}</small>
              </div>
              <div className="col-4">
                <small className="text-success">Seleccionadas: {selectedPoints.length}</small>
              </div>
              <div className="col-4">
                <small className="text-warning">Patrón: {config.patternType}</small>
              </div>
            </div>
          </div>
          <div className="col-lg-4 px-4">
            <div className="sticky-top" style={{top:40}}>
              <h4 className="mb-3">¡Configura tu misión espacial!</h4>
              <div className="mb-3">
                <label className="form-label">Patrón Espacial:</label>
                <select 
                  className="form-select" 
                  value={config.patternType}
                  onChange={e => setConfig({...config, patternType: e.target.value})}
                >
                  <option value="random">Aleatorio</option>
                  <option value="clustered">Agrupado</option>
                  <option value="dispersed">Disperso</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Número de Puntos:</label>
                <input 
                  type="range" 
                  className="form-range"
                  min="10"
                  max="200"
                  value={config.pointCount}
                  onChange={e => setConfig({...config, pointCount: parseInt(e.target.value)})}
                />
                <small className="text-info">{config.pointCount} puntos</small>
              </div>
              <div className="mb-3">
                <label className="form-label">Número de Grupos:</label>
                <input 
                  type="range" 
                  className="form-range"
                  min="1"
                  max="5"
                  value={config.clusters}
                  onChange={e => setConfig({...config, clusters: parseInt(e.target.value)})}
                />
                <small className="text-info">{config.clusters} grupos</small>
              </div>
              <div className="mb-3">
                <label className="form-label">¿Qué quieres analizar?</label>
                <select 
                  className="form-select" 
                  value={config.analysisType}
                  onChange={e => setConfig({...config, analysisType: e.target.value})}
                >
                  <option value="semivariogram">¿Se parecen los vecinos? (Semivariograma)</option>
                  <option value="clustering">¿Quiénes son amigos? (Clustering K-means)</option>
                  <option value="density">¿Dónde hay más puntos? (Densidad Kernel)</option>
                </select>
              </div>
              <div className="d-grid gap-2">
                <button 
                  className="btn btn-warning"
                  onClick={performAnalysis}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? 'Analizando...' : '¡Analizar!'}
                </button>
                <button 
                  className="btn btn-outline-info"
                  onClick={generateNewData}
                >
                  ¡Nuevo Mapa!
                </button>
              </div>
              {renderAnalysisResults()}
              {/* Panel de misión con mensaje motivador */}
              {analysisResults && (
                <div className="alert alert-success mt-3 animate__animated animate__bounceIn">
                  <span role="img" aria-label="astronauta">🧑‍🚀</span> ¡Misión completada! Explora los resultados y sigue descubriendo el universo espacial.
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h5>Conceptos Espaciales:</h5>
          <div className="row">
            {conceptos.map((c, i) => (
              <div className="col-md-3" key={i}>
                <div className="card h-100 animate__animated animate__fadeInUp">
                  <div className="card-body text-center">
                    <h6>{c.nombre}</h6>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => setShowConcepto(i)}>
                      ¿Qué es?
                    </button>
                    {showConcepto === i && (
                      <div className="mt-2 text-secondary" style={{fontSize:'0.95em'}}>
                        {c.explicacion}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JuegoGeoestadistico;
