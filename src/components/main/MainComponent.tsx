import React, { FC, useEffect, useState } from 'react';
import './style.css';
import LeftHeader from '../Headers/LeftHeader';
import { getMessagesInChat, getUserChats } from '../../services/chatService';
import { useAuthContext } from '../../context/User';
import { Chat, Message, UserData } from '../../dto/index';
import ChatComponent from '../Chat/Chat';
import secondAvatar from '../../assets/secondAvatar.jpg'
import ChatHeader from '../Headers/ChatHeader';
import MessageContainer from '../MessageContainer/MessageContainer';
import MessageInput from '../MessageContainer/MessageInput/MessageInput';
import { useSocketContext } from '../../context/Socket';
import { toast } from 'react-toastify';

const MainComponent: FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const { socket } = useSocketContext();
  const { user } = useAuthContext();

  
  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (socket && user) {
      socket.on("receiveMessage", (newMessage: Message) => {
        const updateChats = (chatList: Chat[]): Chat[] => {
          const updatedChats = chatList.map((chat) =>
            chat.chatId === newMessage.chatId
              ? { ...chat, lastMessage: newMessage }
              : chat
          );

          return updatedChats.sort(
            (a, b) =>
              new Date(b.lastMessage?.createdAt || 0).getTime() -
              new Date(a.lastMessage?.createdAt || 0).getTime()
          );
        };

        const updatedChats = updateChats(chats);
        setChats(updatedChats);
        //filterChats(updatedChats, searchQuery);

        if (newMessage.chatId === selectedChat) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        } else if (newMessage.senderId !== user.id) {
          toast.info(`${newMessage.senderName}: ${newMessage.text}`);
        }
      });

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [selectedChat, chats, messages, socket, user.id, setChats, setMessages]);



  const fetchChats = async () => {
    try {
      const chats = await getUserChats(user?.id);
      setChats(chats);
      console.log(chats);
      
    } catch (error) {
      console.log(error);
      setError('Error fetching chats');
    }
  };

  const handleDeleteChat = (chatId: string) => {
    console.log("delete chat", chatId);
    
    setChats((prevChats) => prevChats.filter((chat) => chat.chatId !== chatId));
  };

  const filteredChats = chats.filter((chat) =>
    `${chat.user.firstName} ${chat.user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );


  
  const handleGetMessagesInChat = async (chatId: string) => {
    try {
      setSelectedChat(chatId);
      const chatMessages = await getMessagesInChat(chatId);
      setMessages(chatMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const generateUniqueId = () => Math.random().toString(36).substring(2, 9);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const message = {
        senderId: user.id,
        chatId: selectedChat,
        text: newMessage,
        createdAt: new Date().toISOString(),
      };
      socket.emit('sendMessage', message);
      setNewMessage('');

      if (selectedChat === message.chatId) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: generateUniqueId(), // Генеруємо унікальний ID
            senderId: message.senderId,
            chatId: message.chatId,
            text: message.text,
            timestamp: new Date(message.createdAt).toISOString(), // Конвертуємо дату
          },
        ]);
      }

      const updatedChats = chats.map((chat) =>
        chat.chatId === selectedChat
          ? { ...chat, lastMessage: message }
          : chat
      );

      setChats(updatedChats);
    }
  };

  if (error || user == null) {
    return <div>Error: {error}</div>;
  }



  return (
    <div className="main-page-container">
      <div className="container-1">
        <LeftHeader onSearchChange={(value) => setSearchTerm(value)} />
      <div className="chats-container">
          <a className="chat-text">Chats</a>
          {filteredChats.map((chat) => (
            <ChatComponent
              key={chat.chatId}
              chatID={chat.chatId}
              //otherUserId={chat.user.otherUserId}
              avatarSrc={secondAvatar}
              name={`${chat.user.firstName} ${chat.user.lastName}`}
              message={chat.lastMessage ? chat.lastMessage.text : 'No messages yet'}
              date={chat.lastMessage ? new Date(chat.lastMessage.createdAt).toLocaleDateString() : ''}
              //status={onlineUsers[chat.user.otherUserId] ? 'online' : 'offline'}
              status='online'
              onClick={() => handleGetMessagesInChat(chat.chatId)}
              onDelete={() => handleDeleteChat(chat.chatId)}
            />
          ))}
        </div>
      </div>
      <div className="container-2">
        { !selectedChat ? (
            <div className="no-chat-selected">
              <p>Please select a chat</p>
            </div>
        ) : (
          <>
        <ChatHeader 
          //name={`${otherUser?.firstName} ${ otherUser?.lastName}`}
          name = {`${chats.find((chat) => chat.chatId === selectedChat)?.user.firstName}`}
          status='online'/>
        <MessageContainer messages={messages}/>
        <MessageInput
         newMessage={newMessage}
         setNewMessage={setNewMessage}
         handleSendMessage={handleSendMessage}
         />
         </>
        )}
      </div>
    </div>
  );
};

export default MainComponent;
