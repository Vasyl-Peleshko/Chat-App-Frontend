import React, {useState} from 'react';
import Avatar from '../Avatar/Avatar';
import './style.css';
import { FaTrash } from 'react-icons/fa';
import { deleteChat } from '../../services/chatService';
import ConfirmationModal from '../ModalWindows/deleteModal/ConfirmationModal';
import { ChatProps } from '../../dto/componentsProps/index';

const ChatComponent: React.FC<ChatProps> = ({ chatID, avatarSrc, name, message, date, status, onClick, onDelete }) => {
    const [isModalVisible, setModalVisible] = useState(false); 
    const [messageToDelete, setMessageToDelete] = useState<string>(''); 
  
    const truncatedMessage = message.length > 30 ? `${message.slice(0, 100)}...` : message;
  
    const handleDeleteClick = (e: React.MouseEvent) => {
      e.stopPropagation(); 
      setMessageToDelete(`Are you sure you want to delete the chat with ${name}?`);
      setModalVisible(true); 
    };
  
    const handleConfirmDelete = async () => {
      try {
        await deleteChat(chatID);
        onDelete(chatID); 
        setModalVisible(false); 
      } catch (error) {
        console.error('Error deleting chat:', error);
      }
    };
  
    const handleCancelDelete = () => {
      setModalVisible(false); 
    };
  
    return (
      <div className="chat-box" onClick={onClick}>
        <Avatar avatarSrc={avatarSrc} status={status} />
        <div className="chat-details">
          <div className="header">
            <span className="user-name">{name}</span>
            <div className="right-info">
              <span className="message-date">{date}</span>
              <button className="delete-button" onClick={handleDeleteClick}>
                <FaTrash className="delete-icon" />
              </button>
            </div>
          </div>
          <div className="message-preview">{truncatedMessage}</div>
        </div>
  
        <ConfirmationModal 
          isVisible={isModalVisible} 
          message={messageToDelete} 
          onConfirm={handleConfirmDelete} 
          onCancel={handleCancelDelete} 
        />
      </div>
    );
  };
  
  export default ChatComponent;
