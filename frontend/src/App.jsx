import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { initMercadoPago } from '@mercadopago/sdk-react';

import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import PDFMaster from './pages/tools/PDFMaster';
import MindMap from './pages/tools/MindMap';
import CVMaker from './pages/tools/CVMaker';
import ImageStudio from './pages/tools/ImageStudio';
import PaymentSuccess from './pages/PaymentSuccess';
import Login from './pages/Login';
import Register from './pages/Register';

initMercadoPago('APP_USR-491a0877-3344-4bac-8302-245327d0bb17');

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/tools/pdf-master" element={
          <ProtectedRoute><PDFMaster /></ProtectedRoute>
        } />
        <Route path="/tools/mindmap" element={
          <ProtectedRoute><MindMap /></ProtectedRoute>
        } />
        <Route path="/tools/cv-maker" element={
          <ProtectedRoute><CVMaker /></ProtectedRoute>
        } />
        <Route path="/tools/image-studio" element={
          <ProtectedRoute><ImageStudio /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;