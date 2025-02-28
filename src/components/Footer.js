import React from 'react';
import '../styles/Footer.css'; // Asegúrate de que el archivo CSS esté bien vinculado

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <div className="social-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-x"></i>
          </a>
          <a href="mailto:contacto@teatrotep.com" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-envelope"></i>
          </a>
          <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Teatro Español Pigüé. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
