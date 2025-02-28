import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ShowDetail.css";

function ShowDetail() {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/shows/${id}`)
      .then((response) => {
        setShow(response.data);
      })
      .catch((error) => console.error("Error al obtener el espectáculo:", error));
  }, [id]);

  if (!show) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="show-detail-container">
      {/* Columna 1 - Imagen */}
      <div className="show-image-container">
        <img src={`http://localhost:5001/uploads/${show.image}`} alt={show.name} className="show-image" />
      </div>

      {/* Columna 2 - Nombre y Descripción */}
      <div className="show-info-container">
        <h2>{show.name}</h2>
        <p>{show.description}</p>
      </div>

      {/* Columna 3 - Fecha, Hora, Precio y Botón */}
      <div className="show-extra-container">
        <p><strong>Fecha:</strong> {new Date(show.date).toLocaleDateString("es-ES")}</p>
        <p><strong>Hora:</strong> {show.hora.substring(0, 5)} hs</p>
        <a 
          href={show.link.startsWith("http") ? show.link : `https://${show.link}`} 
          target="_blank" 
          rel="noopener noreferrer"
>
          <button className="buy-button">Comprar entradas</button>
        </a>
      </div>
    </div>
  );
}

export default ShowDetail;
