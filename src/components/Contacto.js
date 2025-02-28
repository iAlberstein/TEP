import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Importar SweetAlert2
import "../styles/Contacto.css";

function Contacto() {
  const [formData, setFormData] = useState({
    subject: "",
    name: "",
    email: "",
    message: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("/api/contact", formData);
      // Mostrar SweetAlert de éxito
      Swal.fire({
        title: "¡Éxito!",
        text: "Mensaje enviado correctamente",
        icon: "success",
        confirmButtonText: "OK",
        timer: 2000, // Se cierra automáticamente después de 2 segundos
        timerProgressBar: true,
      }).then(() => {
        navigate("/"); // Redirige al home después de cerrar el alert
      });
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      // Mostrar SweetAlert de error
      Swal.fire({
        title: "Error",
        text: "Error al enviar el mensaje. Intenta nuevamente.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="contacto-container">
      <h2>Contacto</h2>
      <form onSubmit={handleSubmit} className="contacto-form">
        <div className="form-group">
          <label htmlFor="subject">Asunto:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Contacto;