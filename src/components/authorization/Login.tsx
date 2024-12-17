import React, { FC, useState } from "react";
import InputField from "./InputField";
import { Link, useNavigate } from "react-router-dom";
import { useAuthService } from "../../services/authService";

const Login: FC = () => {
  const { login } = useAuthService();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigator = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData = { email, password };

    try {
      const response = await login(userData); 
      console.log("Logged in successfully", response);
      navigator('/chat')
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
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

        <a href="#" className="forgot-password-link">Forgot password?</a>
        <button type="submit" className="login-button">Log In</button>
      </form>

      <p className="signup-prompt">
        Don&apos;t have an account? <Link to="/signup" className="signup-link">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;