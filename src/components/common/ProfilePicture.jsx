import React from 'react';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../assets/default-avatar.png';

const ProfilePicture = ({ user }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/profile');
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <img
        src={user?.foto_perfil || defaultAvatar}
        alt="Profile"
        className="w-10 h-10 rounded-full"
      />
    </div>
  );
};

export default ProfilePicture;
