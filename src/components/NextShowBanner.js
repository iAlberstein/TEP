import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NextShowBanner.css';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('es-AR', options);
};

function NextShowBanner() {
  const [nextShow, setNextShow] = useState(null);

  const fetchNextShow = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/next-show');
      const data = await response.json();
      setNextShow(data);
    } catch (error) {
      console.error('Error fetching next show:', error);
    }
  };

  useEffect(() => {
    fetchNextShow();
  }, []);

  return (
    nextShow && (
      <div className="banner">
          <h1>PRÓXIMAMENTE</h1>
        <Link to={`/show/${nextShow.id_show}`}>
          <picture>
            <source
              media="(min-width: 750px)" // Computadoras y tablets
              srcSet={`http://localhost:5001/uploads/${nextShow.bannerImage || nextShow.image}`}
            />
            <img
              src={`http://localhost:5001/uploads/${nextShow.image}`}
              alt={nextShow.name}
              className="banner-image"
            />
          </picture>
        </Link>
        
        <div className="banner-info">
          <h2>{nextShow.name}</h2>
          <p>
            {formatDate(nextShow.date)} - {nextShow.hora?.substring(0, 5)}
          </p>
          <Link to={`/show/${nextShow.id_show}`}>
            <button className="buy-button">Comprar entradas</button>
          </Link>
        </div>
      </div>
    )
  );
}

export default NextShowBanner;