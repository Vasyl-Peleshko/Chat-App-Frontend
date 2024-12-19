import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './components/authorization/Login'
import SignUp from './components/authorization/SignUp'
import { useAuthContext } from './context/User';
import MainComponent from './components/main/MainComponent';
import { ToastContainer } from 'react-toastify';

function App() {
  const { user } = useAuthContext();
  
  return (
    <>
    <Router>
      <div className='App'>
      <Routes>
        <Route path="/" element={user ? <Navigate to={"/chat"} /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chat" element={<MainComponent />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      </div>
      <ToastContainer/>
    </Router>
    </>
  )
}

export default App
