import React, { useState, useRef, useEffect } from 'react';

const getRandomPoints = (count, width, height) => {
  // Genera puntos aleatorios para el juego
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
  }));
};

const getClusterCenters = (clusters, width, height) => {
  // Centros de clusters para dificultad
  return Array.from({ length: clusters }, () => ({
    x: Math.random() * (width - 80) + 40,
    y: Math.random() * (height - 80) + 40,
  }));
};

const generatePattern = (dificultad, width, height) => {
  // Genera puntos agrupados según dificultad
  let clusters = dificultad === 'facil' ? 1 : dificultad === 'medio' ? 2 : 3;
  let points = [];
  let centers = getClusterCenters(clusters, width, height);
  for (let c = 0; c < clusters; c++) {
    for (let i = 0; i < 20; i++) {
      let angle = Math.random() * 2 * Math.PI;
      let radius = Math.random() * 40 + 10;
      points.push({
        x: centers[c].x + Math.cos(angle) * radius,
        y: centers[c].y + Math.sin(angle) * radius,
        cluster: c,
      });
    }
  }
  // Añade puntos aleatorios dispersos
  for (let i = 0; i < 20; i++) {
    points.push({ x: Math.random() * width, y: Math.random() * height, cluster: -1 });
  }
  return { points, centers };
};

const Juego = () => {
  const [dificultad, setDificultad] = useState('medio');
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [playing, setPlaying] = useState(false);
  const [pattern, setPattern] = useState({ points: [], centers: [] });
  const [clicked, setClicked] = useState([]);
  const timerRef = useRef();
  const width = 400, height = 400;

  useEffect(() => {
    if (playing && time > 0) {
      timerRef.current = setTimeout(() => setTime(time - 1), 1000);
    } else if (time === 0) {
      setPlaying(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [playing, time]);

  const startGame = () => {
    setPattern(generatePattern(dificultad, width, height));
    setScore(0);
    setTime(60);
    setClicked([]);
    setPlaying(true);
  };

  const resetGame = () => {
    setPlaying(false);
    setScore(0);
    setTime(60);
    setClicked([]);
    setPattern({ points: [], centers: [] });
  };

  const handleClick = (e) => {
    if (!playing) return;
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Detecta si el click está cerca de un centro de cluster
    let found = false;
    pattern.centers.forEach((center, idx) => {
      const dist = Math.sqrt((center.x - x) ** 2 + (center.y - y) ** 2);
      if (dist < 50 && !clicked.includes(idx)) {
        setScore((s) => s + 10);
        setClicked((prev) => [...prev, idx]);
        found = true;
      }
    });
    if (!found) setScore((s) => (s > 0 ? s - 2 : 0));
  };

  return (
    <section id="juego" className="py-5">
      <div className="container">
        <h2 className="section-title text-center">Juego Educativo: Detectando Patrones Espaciales</h2>
        <div className="game-container">
          <div className="row">
            <div className="col-md-8">
              <div
                id="gameArea"
                style={{ height: 400, backgroundColor: '#e9ecef', borderRadius: 8, position: 'relative', overflow: 'hidden', cursor: playing ? 'crosshair' : 'not-allowed' }}
                onClick={handleClick}
              >
                <svg width={width} height={height} style={{ display: 'block' }}>
                  {pattern.points.map((pt, i) => (
                    <circle key={i} cx={pt.x} cy={pt.y} r={6} fill={pt.cluster === -1 ? '#bbb' : '#3498db'} opacity={playing ? 1 : 0.3} />
                  ))}
                  {clicked.map((idx) => (
                    <circle key={idx} cx={pattern.centers[idx].x} cy={pattern.centers[idx].y} r={22} fill="#e74c3c" opacity={0.3} />
                  ))}
                </svg>
                {!playing && <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,0.7)',fontSize:28,fontWeight:600}}>¡Haz clic en Comenzar Juego!</div>}
                {time === 0 && <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.6)',color:'#fff',fontSize:32,fontWeight:700}}>¡Tiempo terminado!</div>}
              </div>
            </div>
            <div className="col-md-4">
              <h4>Instrucciones del Juego</h4>
              <p>Identifica los patrones espaciales en el mapa. Haz clic en las áreas donde creas que hay agrupaciones significativas.</p>
              <div className="mb-3">
                <label htmlFor="dificultad" className="form-label">Dificultad:</label>
                <select className="form-select" id="dificultad" value={dificultad} onChange={e => setDificultad(e.target.value)} disabled={playing}>
                  <option value="facil">Fácil</option>
                  <option value="medio">Medio</option>
                  <option value="dificil">Difícil</option>
                </select>
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-primary" onClick={startGame} disabled={playing}>Comenzar Juego</button>
                <button className="btn btn-outline-secondary" onClick={resetGame}>Reiniciar</button>
              </div>
              <div className="mt-3">
                <h5>Puntuación: <span id="score">{score}</span></h5>
                <h5>Tiempo: <span id="time">{time}</span>s</h5>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h5>Conceptos Aprendidos:</h5>
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h6>Autocorrelación Espacial</h6>
                    <p className="small">La tendencia de áreas cercanas a tener valores similares.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h6>Patrones de Puntos</h6>
                    <p className="small">Distribución de eventos en el espacio: agrupados, dispersos o aleatorios.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h6>Análisis de Clusters</h6>
                    <p className="small">Identificación de grupos significativos en datos espaciales.</p>
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

export default Juego;
