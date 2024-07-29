import React from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home flex flex-col items-center p-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-center mt-8 sm:mt-16">¡Bienvenido a MochiShare! 🌍✨</h1>
      <p className="text-center mb-6 max-w-2xl mt-6 sm:mt-12">
        Tu aventura comienza aquí. Comparte tus increíbles historias de viaje,
        descubre nuevos destinos y conecta con mochileros apasionados de todo el mundo.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-7xl">
        <Card 
          title={user ? "Personaliza tu perfil" : "Crea tu perfil"} 
          description="Personaliza tu espacio y comparte tus experiencias." 
          link="/profile" 
          imgSrc="/c1.png"
        />
        <Card 
          title="Publica tus experiencias" 
          description="Inspira y deja que te inspiren." 
          link="/experiences" 
          imgSrc="/c2.png"
        />
        <Card 
          title="Explora y conecta" 
          description="Encuentra relatos fascinantes y haz amigos viajeros." 
          link="/connect" 
          imgSrc="/c3.png"
        />
        <Card 
          title="Crea un foro" 
          description="Inicia debates y comparte consejos con la comunidad mochilera." 
          link="/forum" 
          imgSrc="/c4.png"
        />
      </div>
    </div>
  );
};

export default Home;