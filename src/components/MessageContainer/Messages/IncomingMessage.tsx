import React, { FC } from 'react';
import './style.css';
import avatarGuestPic from '../../../assets/secondAvatar.jpg';
import { MessageProps } from '../../../dto/componentsProps/index';


export const IncomingMessage: FC<MessageProps> = ({ text, createdAt }) => {
    return (
      <div className="message-wrapper">
        <img src={avatarGuestPic} alt="Avatar" className="message-avatar" />
        <div className="message-bubble incoming">
          <div className="message-content">
            <p className="message-text">{text}</p>
            <span className="message-time">{createdAt}</span>
          </div>
        </div>
      </div>
    );
  };
  