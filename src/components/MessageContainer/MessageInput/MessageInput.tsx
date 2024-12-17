import React, { FC } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import './style.css';

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (value: string) => void;
  handleSendMessage: () => void;
}

const MessageInput: FC<MessageInputProps> = ({ newMessage, setNewMessage, handleSendMessage }) => {
  return (
    <div className="message-composer">
      <div className="message-composer-input-container">
        <input
          type="text"
          className="message-composer-input"
          placeholder="Type your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="send-button" onClick={handleSendMessage}>
          <FaArrowRight className="send-icon" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
