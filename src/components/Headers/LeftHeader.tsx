import React, { FC } from "react";
import { useAuthContext } from "../../context/User";
import avatar from '../../assets/avatat.jpg';
import { useNavigate } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { FaSearch } from "react-icons/fa";
import './style.css'

interface LeftHeaderProps {
    onSearchChange: (value: string) => void; // Тип функції, яка приймає рядок
}

const LeftHeader: FC<LeftHeaderProps> = ({onSearchChange} ) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  
  if (!user) {
    return <div>Loading...</div>; // Or handle the case when the user is not logged in
  }

  return (
    <header className="header-container">
      <div className="user-section">
        <div className="user-info">
          <Avatar avatarSrc={avatar} status="online" />
          <span className="about-user">{`${user.firstName} ${user.lastName}`}</span>
        </div>
        <div className="button-section">
            <button className="create-chat-btn">
            {/* <FaPlus className="plus-icon" /> */}
            +
            </button>
            <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>
      </div>
      <div className="search-section">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search chat"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default LeftHeader;
