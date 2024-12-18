import React, { FC, useState } from "react";
import { useAuthContext } from "../../context/User";
import avatar from '../../assets/avatat.jpg';
import { useNavigate } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { FaSearch } from "react-icons/fa";
import './style.css'
import CreateChatModal from "../ModalWindows/createChatModal/CreateChatModal";
import { useAuthService } from "../../services/authService";
import { Chat, UserData } from "../../dto";
import { createChat } from "../../services/chatService";
import { toast } from "react-toastify";
import { HandleCreateChatProps, LeftHeaderProps } from "../../dto/componentsProps/index";

const LeftHeader: FC<LeftHeaderProps> = ({onSearchChange, onChatCreated, chats} ) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { user } = useAuthContext();
  const { getUserByName } = useAuthService();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  const handleCreateChat = async ({ firstName, lastName }: HandleCreateChatProps) => {
    try {
      if (!firstName.trim() || !lastName.trim()) {
        throw new Error("First name and last name cannot be empty.");
      }

      if (firstName === user.firstName && lastName === user.lastName) {
        throw new Error("You cannot create a chat with yourself.");
      }

      const newUser: UserData | null = await getUserByName(firstName, lastName);

      if (!newUser) {
        throw new Error('User not found');
      }

      const existingChat = chats.find((chat: Chat) => chat.user.otherUserId === newUser._id);
      if (existingChat) {
        throw new Error("A chat with this user already exists.");
      }

      const participants = [newUser._id, user.id];
      const chat = await createChat(participants);

      const chatDetails = {
        chatId: chat._id,
        user: {
          otherUserId: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName
        },
        lastMessage: null
      };

      onChatCreated(chatDetails);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('There is no registred user with such name and surname in our chat');
    }
  };


  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <header className="header-container">
      <div className="user-section">
        <div className="user-info">
          <Avatar avatarSrc={avatar} status="online" />
          <span className="about-user">{`${user.firstName} ${user.lastName}`}</span>
        </div>
        <div className="button-section">
            <button className="create-chat-btn" onClick={openModal}>
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
      <CreateChatModal isOpen={isModalOpen} onCreate={handleCreateChat} onCancel={closeModal} />

    </header>
  );
};

export default LeftHeader;
