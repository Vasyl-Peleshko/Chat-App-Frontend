export interface CreateChatModalProps {
    isOpen: boolean;
    onCreate: (data: { firstName: string; lastName: string }) => void;
    onCancel: () => void;
  }
  