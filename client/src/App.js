// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import BodyTypePage from './pages/BodyTypePage';
import SkinTonePage from './pages/SkinTonePage';
import RecommendationsPage from './pages/RecommendationsPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/body-type" element={<PrivateRoute><BodyTypePage /></PrivateRoute>} />
          <Route path="/skin-tone" element={<PrivateRoute><SkinTonePage /></PrivateRoute>} />
          <Route path="/recommendations" element={<PrivateRoute><RecommendationsPage /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;