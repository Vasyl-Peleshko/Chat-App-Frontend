import React, { FC } from 'react';
import './style.css';
import avatarPic from '../../assets/secondAvatar.jpg';
import Avatar from '../Avatar/Avatar';

interface ChatHeaderProps {
  name: string;
  status: 'online' | 'offline';
}

const ChatHeader: FC<ChatHeaderProps> = ({ name, status }) => {
  return (
    <div className="chat-header-wrapper">
      <Avatar avatarSrc={avatarPic} status={status} />
      <span className="chat-header-name">{name}</span>
    </div>
  );
};

export default ChatHeader;
