import React, { useEffect, useState } from 'react';
import { createExperiencia, fetchDestinations, addDestination } from '../services/api';
import { useAuth } from '../context/AuthContext';
import SelectCountry from '../components/common/SelectCountry';
import Modal from '../components/common/Modal';
import '../styles/ExperienceForm.css';

const ExperienceForm = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [newDestination, setNewDestination] = useState('');
  const [destinationDescription, setDestinationDescription] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const loadDestinations = async () => {
      if (selectedCountry) {
        const data = await fetchDestinations(selectedCountry.value);
        setDestinations(data);
      }
    };

    loadDestinations();
  }, [selectedCountry]);

  const handleAddDestination = async () => {
    if (newDestination.trim() && destinationDescription.trim()) {
      const destinationData = {
        nombre: newDestination,
        descripcion: destinationDescription,
        id_pais: selectedCountry.value
      };
      await addDestination(destinationData);
      setNewDestination('');
      setDestinationDescription('');
      const data = await fetchDestinations(selectedCountry.value);
      setDestinations(data);
      setModalOpen(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCountry || !selectedDestination) {
      alert('Please select a country and destination.');
      return;
    }

    const formData = new FormData();
    formData.append('titulo', title);
    formData.append('descripcion', description);
    if (photo) {
      formData.append('fotos', photo);
    }
    formData.append('id_destino', selectedDestination);
    formData.append('id_usuario', user.id_usuario);
    formData.append('fecha_inicio_viaje', startDate);
    formData.append('fecha_fin_viaje', endDate);

    try {
      await createExperiencia(formData);
      alert('Experience created successfully');
      // Optionally reset form fields here
    } catch (error) {
      console.error('Error creating experience:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="experience-form">
      <div className="experience-header">
        <button type="submit" className="publish-button">Publicar</button>
      </div>
      <div className="experience-image">
        <input
          type="file"
          onChange={handlePhotoChange}
          className="image-input"
        />
        {photoPreview && (
          <div className="photo-preview">
            <img src={photoPreview} alt="Preview" />
          </div>
        )}
      </div>
      <div className="experience-details">
        <label>País:</label>
        <SelectCountry selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
        <label>Destino:</label>
        <select
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)}
          className="input-field"
        >
          <option value="">Seleccione un destino existente</option>
          {destinations.map(destination => (
            <option key={destination.id_destino} value={destination.id_destino}>
              {destination.nombre}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => setModalOpen(true)} className="add-destination-button">
          Añadir Destino
        </button>
        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
        <label>Descripción:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
        />
        <label>Fecha de Inicio del Viaje:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="input-field"
        />
        <label>Fecha de Fin del Viaje:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="input-field"
        />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>Añadir Nuevo Destino</h2>
        <input
          type="text"
          value={newDestination}
          onChange={(e) => setNewDestination(e.target.value)}
          placeholder="Ingrese un nuevo destino"
          className="input-field"
        />
        <textarea
          value={destinationDescription}
          onChange={(e) => setDestinationDescription(e.target.value)}
          placeholder="Ingrese la descripción del destino"
          className="input-field"
        />
        <button type="button" onClick={handleAddDestination} className="add-destination-button">
          Agregar Destino
        </button>
      </Modal>
    </form>
  );
};

export default ExperienceForm;
