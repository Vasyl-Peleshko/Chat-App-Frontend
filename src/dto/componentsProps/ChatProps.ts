
export interface ChatProps {
    chatID: string;
    avatarSrc: string;
    name: string;
    message: string;
    date: string;
    status: 'online' | 'offline';
    onClick: () => void;
    onDelete: (chatId: string) => void; 
  
  }