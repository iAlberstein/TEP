import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/AdminTep.css";

function AdminTep() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [mes, setMes] = useState('');
  const [date, setDate] = useState('');
  const [hora, setHora] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null); // Nuevo estado para ImagenBanner
  const [shows, setShows] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [showToEdit, setShowToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  useEffect(() => {
    loadShows();
  }, []);

  const loadShows = () => {
    axios.get('http://localhost:5001/api/shows')
      .then(response => {
        setShows(response.data);
      })
      .catch(error => console.error('Error al obtener los espectáculos:', error));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const filteredShows = shows.filter(show => {
    const matchesSearchTerm = show.name.toLowerCase().includes(searchTerm.toLowerCase()) || show.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMonth = selectedMonth ? show.mes === selectedMonth : true;
    return matchesSearchTerm && matchesMonth;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const horaFormatted = hora ? hora.split(':').slice(0, 2).join(':') : '';

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('mes', mes);
    formData.append('date', date);
    formData.append('hora', horaFormatted);
    formData.append('link', link);
    if (image) formData.append('image', image);
    if (bannerImage) formData.append('bannerImage', bannerImage); // Agregar bannerImage al formData

    try {
      if (editMode) {
        formData.append('imagePath', showToEdit.image); // Enviar imagen actual si no se cambia
        formData.append('bannerImagePath', showToEdit.bannerImage); // Enviar banner actual si no se cambia
        const response = await axios.put(`http://localhost:5001/api/shows/${showToEdit.id_show}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert(response.data.message || 'Espectáculo actualizado con éxito');
      } else {
        const response = await axios.post('http://localhost:5001/api/shows', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert(response.data.message || 'Espectáculo agregado exitosamente');
      }
      resetForm();
      setEditMode(false);
      setShowToEdit(null);
      loadShows();
    } catch (error) {
      console.error('Error al guardar el espectáculo:', error.response?.data || error.message);
      alert('Hubo un error. Revisa la consola para más detalles.');
    }
  };

  const handleEdit = (show) => {
    setName(show.name);
    setDescription(show.description);
    setPrice(show.price);
    setMes(show.mes);
    setDate(formatDateForInput(show.date));
    setHora(show.hora);
    setLink(show.link);
    setShowToEdit(show);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/shows/${id}`);
      alert(response.data.message || 'Espectáculo eliminado');
      loadShows();
    } catch (error) {
      console.error('Error al eliminar el espectáculo:', error);
      alert('Hubo un error al eliminar el espectáculo.');
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setMes('');
    setDate('');
    setHora('');
    setLink('');
    setImage(null);
    setBannerImage(null); // Resetear bannerImage
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="admin-tep-container">
      <div className="admin-tep-left">
        <h1>{editMode ? 'Modificar Espectáculo' : 'Cargar Nuevo Espectáculo'}</h1>
        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Descripción:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

          <label>Precio:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

          <label>Mes:</label>
          <input type="text" value={mes} onChange={(e) => setMes(e.target.value)} required />

          <label>Fecha:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

          <label>Hora:</label>
          <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />

          <label>Link:</label>
          <input type="text" value={link} onChange={(e) => setLink(e.target.value)} required />

          <label>Imagen (para celulares):</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

          <label>Imagen Banner (para computadoras/tablets):</label>
          <input type="file" accept="image/*" onChange={(e) => setBannerImage(e.target.files[0])} />

          <button type="submit">{editMode ? 'Guardar Cambios' : 'Guardar Espectáculo'}</button>
        </form>
      </div>

      <div className="admin-tep-right">
        <h1 className="center-title">Espectáculos Cargados</h1>
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

        <div className="shows-container">
          {filteredShows.map(show => (
            <div key={show.id_show} className="show-card">
              <img src={`http://localhost:5001/uploads/${show.image}`} alt={show.name} className="show-image" />
              <div className="show-info">
                <h3>{show.name}</h3>
                <p>{show.description}</p>
                <button onClick={() => handleEdit(show)}>Modificar</button>
                <button onClick={() => handleDelete(show.id_show)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminTep;