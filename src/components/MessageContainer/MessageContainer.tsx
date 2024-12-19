import React, { FC, useRef, useEffect } from 'react';
import './style.css';
import { OutgoingMessage } from './Messages/OutgoingMessage';
import { IncomingMessage } from './Messages/IncomingMessage';
import { useAuthContext } from '../../context/User';
import { MessageContainerProps } from '../../dto/componentsProps/index';

const MessageContainer: FC<MessageContainerProps> = ({ messages }) => {
  const conversationEndRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    
  }, [messages]);

  if(user == null){
    return(<>Error</>)
  }

  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        msg.senderId === user.id ? (
          <OutgoingMessage
            key={index}
            text={msg.text}
            createdAt={msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'Unknown time'}
            />
        ) : (
          <IncomingMessage
            key={index}
            text={msg.text}
            createdAt={msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'Unknown time'}
            />
        )
      ))}
      <div ref={conversationEndRef} />
    </div>
  );
};

export default MessageContainer;
