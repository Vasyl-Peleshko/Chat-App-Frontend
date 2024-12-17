import axios from "axios";
import { UserData, UserResponse } from "../dto/index";
import { useAuthContext } from "../context/User";

const API_URL = "http://localhost:3000/auth";


// export const signup = async (userData: UserData): Promise<UserResponse> => {
//   try {
//     const response = await axios.post<UserResponse>(`${API_URL}/signup`, userData, {
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error registering user:", error);
//     throw error;
//   }
// };

// export const login = async (userData: UserData): Promise<UserResponse> => {
//   try {
//     const response = await axios.post<UserResponse>(`${API_URL}/login`, userData, {
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error signing in user:", error);
//     throw error;
//   }
// };

// export const getUserByName = async (
//   firstName: string,
//   lastName: string
// ): Promise<UserResponse["user"]> => {
//   try {
//     const response = await axios.post<UserResponse>(`${API_URL}/getUserByName`, {
//       firstName,
//       lastName,
//     });
//     return response.data.user;
//   } catch (error) {
//     console.error("Error fetching user by name:", error);
//     throw error;
//   }
// };


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