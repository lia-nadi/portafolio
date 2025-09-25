import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InfoCurso from './components/InfoCurso';
import Historia from './components/Historia';
import Temario from './components/Temario';
import Trabajos from './components/Trabajos';
import Juego from './components/Juego';
import Mapas from './components/Mapas';
import Recursos from './components/Recursos';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/custom.css';

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <InfoCurso />
      <Historia />
      <Temario />
      <Trabajos />
      <Juego />
      <Mapas />
      <Recursos />
      <Contacto />
      <Footer />
    </>
  );
}

export default App;
