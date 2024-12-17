import React, { FC } from 'react';
import './style.css';

interface AvatarProps {
  avatarSrc: string;
  status: 'online' | 'offline';
}

const Avatar: FC<AvatarProps> = ({ avatarSrc, status }) => {
  return (
    <div className="avatar-container">
      <img src={avatarSrc} alt="User Avatar" className="avatar-image" />
      <div className={`status-indicator ${status}`}></div>
    </div>
  );
};

export default Avatar;
