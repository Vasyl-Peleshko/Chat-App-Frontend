export interface Message {
    id?: string;
    senderId: string;
    chatId: string;
    text: string;
    timestamp: string;
    createdAt?: string
    senderName?: string
  }