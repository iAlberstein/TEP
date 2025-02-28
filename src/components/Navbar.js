// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../styles/NavBar.css";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false); // Estado para controlar el acordeón

  const handleLinkClick = () => {
    setIsNavOpen(false); // Cerrar el menú cuando se haga clic en un enlace
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Teatro TEP</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded={isNavOpen ? "true" : "false"} 
          aria-label="Toggle navigation"
          onClick={() => setIsNavOpen(!isNavOpen)} // Cambiar el estado al hacer clic en el botón
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/cartelera" onClick={handleLinkClick}>Cartelera</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/historia" onClick={handleLinkClick}>Historia</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto" onClick={handleLinkClick}>Contacto</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
