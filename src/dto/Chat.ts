export interface Chat {
    _id?: string;
    chatId: string;
    lastMessage: {
      createdAt?: string;
      text: string;
    };
    user: {
      firstName: string;
      lastName: string;
      otherUserId?: string;
    };
  }
  