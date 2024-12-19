import axios from 'axios';
import { Chat, Message } from '../dto/index';

const API_URL = 'https://chat-app-backend-1-npwv.onrender.com/chat';

export const getUserChats = async (userId: string): Promise<Chat[]> => {
  try {
    const response = await axios.get(`${API_URL}/chats/${userId}`);
    return response.data.chats;
  } catch (error) {
    console.error('Error fetching user chats:', error);
    throw new Error('Error fetching chats');
  }
};

export const createChat = async (participants: string[]): Promise<Chat> => {
  try {
    const response = await axios.post(`${API_URL}/createChat`, { participants });
    return response.data.chat;
  } catch (error) {
    console.error('Error creating chat:', error);
    throw new Error('Error creating chat');
  }
};

export const getMessagesInChat = async (chatId: string): Promise<Message[]> => {
  try {
    const response = await axios.get(`${API_URL}/messages/${chatId}`);
    return response.data.messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw new Error('Error fetching messages');
  }
};

export const sendMessage = async (senderId: string, chatId: string, text: string): Promise<Message> => {
  try {
    const response = await axios.post(`${API_URL}/createMessage`, { senderId, chatId, text });
    return response.data.message;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Error sending message');
  }
};

export const deleteChat = async (chatId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/deleteChat/${chatId}`);
  } catch (error) {
    console.error('Error deleting chat:', error);
    throw new Error('Error deleting chat');
  }
};
