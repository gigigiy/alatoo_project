// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DiaryEntry from './pages/DiaryEntry';
import ForgotPassword from './pages/ForgotPassword';  // Import your ForgotPassword component
import ResetPassword from './components/ResetPassword'; // Add this import
import ResetPasswordForm from './components/ResetPasswordForm'; // Add this import for password reset form

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} /> {/* Add this route */}
    <Route path="/reset-password/:uidb64/:token" element={<ResetPasswordForm />} /> {/* Add this route */}
    <Route path="/diary/:id" element={<DiaryEntry />} />
  </Routes>
);

export default AppRoutes;
