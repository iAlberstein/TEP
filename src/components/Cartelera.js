// TEP/src/components/Cartelera.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Cartelera.css";
import { Link } from 'react-router-dom';


function Cartelera() {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [months, setMonths] = useState([]);

  // Obtener espectáculos desde el backend
  useEffect(() => {
    axios.get('http://localhost:5001/api/shows')
      .then(response => {
        console.log(response.data); // Para verificar que llegan los datos
        setShows(response.data);
        setFilteredShows(response.data);
        const uniqueMonths = [...new Set(response.data.map(show => show.mes))];
        setMonths(uniqueMonths);
      })
      .catch(error => console.error('Error al obtener los espectáculos:', error));
  }, []);

  // Función para formatear la fecha a "21 de agosto"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('es-ES', { month: 'long' });
    return `${day} de ${month}`;
  };

  // Filtrar por nombre de espectáculo
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterShows(e.target.value, selectedMonth);
  };

  // Filtrar por mes
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    filterShows(searchTerm, e.target.value);
  };

  // Función para filtrar los espectáculos por nombre o mes
  const filterShows = (search, month) => {
    let filtered = shows;
    if (search) {
      filtered = filtered.filter(show =>
        show.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (month) {
      filtered = filtered.filter(show => show.mes === month);
    }
    setFilteredShows(filtered);
  };

  return (
    <div className="cartelera-container">
      <h2>Cartelera de espectáculos</h2>
      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar espectáculo..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select className="search-select" onChange={handleMonthChange} value={selectedMonth}>
            <option value="">Seleccionar mes</option>
            {months.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
        </select>
      </div>

      {/* Tarjetas de espectáculos */}
      <div className="shows-container">
        {filteredShows.map(show => (
          <div key={show.id_show} className="show-card">
            <img src={`http://localhost:5001/uploads/${show.image}`} alt={show.name} className="show-image" />
            <div className="show-info">
              <h3>{show.name}</h3>
              <p>{formatDate(show.date)} <br /> {show.hora.substring(0, 5)}</p>
              <Link to={`/show/${show.id_show}`}>
                <button>+ Info</button>
              </Link>
            </div>
          </div>
        ))}
        </div>
    </div>
  );
}

export default Cartelera;
