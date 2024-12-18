import React, { FC, useState } from "react";
import InputField from "./InputField";
import { Link, useNavigate } from "react-router-dom";
import { useAuthService } from "../../services/authService";

const SignUp: FC = () => {
  const { signup } = useAuthService();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { firstName, lastName, email, password };

    try {
      const response = await signup(userData);
      
      console.log("User registered successfully", response);
      navigate("/chat"); 
    } catch (error) {
      console.error("Sign-up failed", error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <InputField 
          type="text" 
          placeholder="First name" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
        />
        <InputField 
          type="text" 
          placeholder="Last name" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
        />
        <InputField 
          type="email" 
          placeholder="Email address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <InputField 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        <button type="submit" className="login-button">Sign Up</button>
      </form>

      <p className="signup-prompt">
        Already have an account? <Link to="/login" className="signup-link">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
