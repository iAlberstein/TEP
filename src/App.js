// TEP/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cartelera from './components/Cartelera';
import ShowDetail from './components/ShowDetail';
import NextShowBanner from './components/NextShowBanner'; 
import AdminTep from './components/AdminTep';  // Importa el componente AdminTep
import './styles/App.css';
import Historia from './components/Historia';
import Contacto from "./components/Contacto";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<NextShowBanner />} />
            <Route path="/cartelera" element={<Cartelera />} />
            <Route path="/show/:id" element={<ShowDetail />} />
            <Route path="/admintep" element={<AdminTep />} /> {/* Ruta para el formulario */}
            <Route path="/historia" element={<Historia />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
