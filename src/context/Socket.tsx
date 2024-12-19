import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "./User";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
}

export const OnlineSocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocketContext = () => {
  const context = useContext(OnlineSocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketContextProvider");
  }
  return context;
};

interface SocketContextProviderProps {
  children: ReactNode;
}

export const SocketContextProvider = ({ children }: SocketContextProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      const newSocket: Socket = io("https://chat-app-backend-vxgi.onrender.com/", {
        query: {
          userId: user.id,
        },
      });

      setSocket(newSocket);

      newSocket.on("updateUserList", (users: string[]) => {
        setOnlineUsers(users);
      });

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <OnlineSocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </OnlineSocketContext.Provider>
  );
};
