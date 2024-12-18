import React, { useState } from 'react';
import './style.css'
import { CreateChatModalProps } from '../../../dto/componentsProps/index';


const CreateChatModal: React.FC<CreateChatModalProps> = ({ isOpen, onCreate, onCancel }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  if (!isOpen) return null;

  const handleCancel = () => {
    setFirstName('');
    setLastName('');
    onCancel(); 
  };

  const handleCreate = () => {
    if (firstName && lastName) {
       setFirstName('');
       setLastName('');
       onCreate({ firstName, lastName });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create New Chat</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button onClick={handleCreate}>Create</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateChatModal;
