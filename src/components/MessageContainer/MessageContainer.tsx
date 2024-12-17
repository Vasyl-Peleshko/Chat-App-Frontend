import React, { FC, useRef, useEffect } from 'react';
import { Message } from '../../dto/index'; // Assuming this is the type of messages
import './style.css';
import { OutgoingMessage } from './Messages/OutgoingMessage';
import { IncomingMessage } from './Messages/IncomingMessage';
import { useAuthContext } from '../../context/User';

interface MessageContainerProps {
  messages: Message[];
}

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
            createdAt={new Date(msg.createdAt).toLocaleString()}
            //createdAt={new Date().toLocaleString()}
          />
        ) : (
          <IncomingMessage
            key={index}
            text={msg.text}
            createdAt={new Date(msg.createdAt).toLocaleString()}
          />
        )
      ))}
      <div ref={conversationEndRef} />
    </div>
  );
};

export default MessageContainer;
