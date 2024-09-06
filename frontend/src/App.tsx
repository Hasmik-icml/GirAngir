// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Register from './pages/login/Register'
import Login from './pages/login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import ForgotPassword from './pages/login/Forgot-Password';
import ResetPassword from './pages/login/Reset-Password';
import Dashboard from "./pages/home/Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </Router>
  );
};
