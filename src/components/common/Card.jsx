import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ title, description, link, imgSrc }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <div onClick={handleClick} className="card p-4 sm:p-6 border rounded-lg shadow-md hover:shadow-lg cursor-pointer text-center flex flex-col justify-between h-full">
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-2">{title}</h2>
        {imgSrc && <img src={imgSrc} alt={title} className="mx-auto mb-2 w-full h-32 object-contain"/>}
      </div>
      <p className="text-sm sm:text-base">{description}</p>
    </div>
  );
};

export default Card;