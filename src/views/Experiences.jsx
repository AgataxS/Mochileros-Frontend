import React, { useEffect, useState } from 'react';
import { fetchExperiences } from '../services/api';
import { ClipLoader } from 'react-spinners';
import '../styles/Experiences.css';

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const data = await fetchExperiences();
        setExperiences(data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };

    loadExperiences();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><ClipLoader /></div>;
  }

  return (
    <div className="experience-list-container">
      <div className="search-bar">
        <input type="text" placeholder="Buscar por país o destino" className="search-input" />
      </div>
      <h2 className="list-title">Experiencias</h2>
      <button onClick={() => window.location.href = '/experience-form'} className="button">
        Registrar nueva experiencia
      </button>
      {Array.isArray(experiences) && experiences.length > 0 ? (
        experiences.map((experience) => (
          <div key={experience.id_experiencia} className="experience-card">
            <div className="experience-header">
              <img src={experience.usuario?.foto_perfil || 'default-avatar.png'} alt="Avatar" className="avatar" />
              <div className="user-info">
                <h3 className="username">{experience.usuario?.nombre}</h3>
                <p className="date">{new Date(experience.fecha_publicacion).toLocaleDateString()}</p>
              </div>
              <div className="country-destination">
                <p className="country">{experience.destino?.pais?.nombre_pais || 'País desconocido'}</p>
                <p className="destination">{experience.destino?.nombre}</p>
              </div>
            </div>
            <h4 className="experience-title">{experience.titulo}</h4>
            {experience.fotos && (
              <div className="experience-image">
                <img src={`http://localhost:8000/storage/${experience.fotos}`} alt="Experience" />
              </div>
            )}
            <p className="experience-description">{experience.descripcion}</p>
            <div className="date-range">
              <p className="start-date">Fecha de inicio: {new Date(experience.fecha_inicio_viaje).toLocaleDateString()}</p>
              <p className="end-date">Fecha fin de viaje: {new Date(experience.fecha_fin_viaje).toLocaleDateString()}</p>
            </div>
            <div className="experience-footer">
              <div className="ratings">
                <span>👍 {experience.votos_positivos}</span>
                <button className="rate-button">Valorar</button>
              </div>
              <div className="comments">
                <textarea placeholder="Escribe un comentario..." className="comment-input"></textarea>
                <button className="comment-button">Comentar</button>
              </div>
              <div className="comment-list">
                {Array.isArray(experience.comentarios) && experience.comentarios.length > 0 ? (
                  experience.comentarios.map((comment) => (
                    <div key={comment.id} className="comment-item">
                      <p>{comment.texto}</p>
                      <span className="comment-date">{new Date(comment.fecha).toLocaleDateString()}</span>
                    </div>
                  ))
                ) : (
                  <p>No hay comentarios.</p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No hay experiencias disponibles.</p>
      )}
    </div>
  );
};

export default Experiences;
