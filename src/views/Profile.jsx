import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, handleUpdateProfile } = useAuth();
  const [nombre, setNombre] = useState(user?.nombre || '');
  const [apellido, setApellido] = useState(user?.apellido || '');
  const [email, setEmail] = useState(user?.email || '');
  const [biografia, setBiografia] = useState(user?.biografia || '');
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('email', email);
    formData.append('biografia', biografia);
    if (fotoPerfil) {
      formData.append('foto_perfil', fotoPerfil);
    }
    await handleUpdateProfile(formData);
  };

  return (
    <form onSubmit={onSubmit} className="profile-form">
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
        className="input"
      />
      <input
        type="text"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        placeholder="Apellido"
        className="input"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="input"
      />
      <textarea
        value={biografia}
        onChange={(e) => setBiografia(e.target.value)}
        placeholder="Biografía"
        className="input"
      />
      <input
        type="file"
        onChange={(e) => setFotoPerfil(e.target.files[0])}
        className="input"
      />
      <button type="submit" className="button">Actualizar Perfil</button>
    </form>
  );
};

export default Profile;
