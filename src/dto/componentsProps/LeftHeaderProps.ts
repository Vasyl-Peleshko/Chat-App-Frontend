import { Chat } from "../Chat";

export interface HandleCreateChatProps {
    firstName: string;
    lastName: string;
  }

export interface LeftHeaderProps {
      onSearchChange: (value: string) => void; 
      onChatCreated: (value: Chat) => void; 
      chats: Chat[];
  }
  