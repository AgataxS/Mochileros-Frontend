import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ title, description, link }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <div onClick={handleClick} className="card">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Card;
