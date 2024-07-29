import React from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a MochiShare!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card 
          title={user ? "Personaliza tu perfil" : "Crea tu perfil"} 
          description="Personaliza tu espacio y comparte tus experiencias." 
          link="/profile" 
        />
        <Card 
          title="Publica tus experiencias" 
          description="Inspira y deja que te inspiren." 
          link="/experiences" 
        />
        <Card 
          title="Explora y conecta" 
          description="Encuentra relatos fascinantes y haz amigos viajeros." 
          link="/connect" 
        />
        <Card 
          title="Crea un foro" 
          description="Inicia debates y comparte consejos con la comunidad mochilera." 
          link="/forum" 
        />
      </div>
    </div>
  );
};

export default Home;
