import axios from "axios";
import { UserData, UserResponse } from "../dto/index";
import { useAuthContext } from "../context/User";
import { toast } from "react-toastify";

const API_URL = "https://chat-app-backend-ijjx.onrender.com/auth";


export const useAuthService = () => {
    const { setUser } = useAuthContext();
  
    const signup = async (userData: UserData): Promise<UserResponse> => {
      try {
        const response = await axios.post<UserResponse>(`${API_URL}/signup`, userData, {
          withCredentials: true,
        });
        const newUser = response.data.user;
  
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        return response.data;
      } catch (error) {
        console.error("Error registering user:", error);
        toast.error("Incorrect email or password");

        throw error;
      }
    };
  
    const login = async (userData: UserData): Promise<UserResponse> => {
      try {
        const response = await axios.post<UserResponse>(`${API_URL}/login`, userData, {
          withCredentials: true,
        });
        const loggedInUser = response.data.user;
  
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        return response.data;
      } catch (error) {
        console.error("Error signing in user:", error);
        toast.error("Incorrect email or password");

        throw error;
      }
    };
  
    const getUserByName = async (
      firstName: string,
      lastName: string
    ): Promise<UserResponse["user"]> => {
      try {
        const response = await axios.post<UserResponse>(`${API_URL}/getUserByName`, {
          firstName,
          lastName,
        });
        return response.data.user;
      } catch (error) {
        console.error("Error fetching user by name:", error);
        throw error;
      }
    };
  
    return { signup, login, getUserByName };
  };