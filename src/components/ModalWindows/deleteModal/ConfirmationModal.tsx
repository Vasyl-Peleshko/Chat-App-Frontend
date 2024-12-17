import React from 'react';
import './style.css'; // Create a separate CSS file for the modal styles

interface ConfirmationModalProps {
  isVisible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isVisible, message, onConfirm, onCancel }) => {
  if (!isVisible) return null; // Don't render the modal if it's not visible

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Deletion</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="confirm-btn" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
