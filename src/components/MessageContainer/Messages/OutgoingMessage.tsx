import React, { FC } from 'react';
import './style.css';
import { MessageProps } from '../../../dto/componentsProps/index';


export const OutgoingMessage: FC<MessageProps> = ({ text, createdAt }) => {
    return (
      <div className="message-bubble outgoing">
        <div className="message-content">
          <p className="message-text">{text}</p>
          <span className="message-time">{createdAt}</span>
        </div>
      </div>
    );
  };