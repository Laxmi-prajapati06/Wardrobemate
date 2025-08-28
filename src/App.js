import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Measurements from './pages/Measurements';
import BodyTypeInput from './pages/BodyTypeInput';
import PhotoUploadPage from './pages/PhotoUploadPage';
import OccasionPage from './pages/OccasionPage';
import BodyTypeSuggestions from './pages/BodyTypeSuggestions';
import ColorSuggestions from './pages/ColorSuggestions';
import OccasionSuggestions from './pages/OccasionSuggestions';
import PersonalizedSuggestions from './pages/PersonalizedSuggestions';
import AuthService from './services/AuthService';
import OccasionOutfit from './pages/OccasionOutfit';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState({
    measurements: {},
    photo: null,
    occasion: '',
    bodyType: '',
    skinTone: ''
  });

  // Check for existing session on initial load
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      // Load user data from localStorage if available
      const savedUserData = localStorage.getItem(`userData_${user.id}`);
      if (savedUserData) {
        setUserData(JSON.parse(savedUserData));
      }
    }
  }, []);

  const updateUserData = (key, value) => {
    const newUserData = {
      ...userData,
      [key]: value
    };
    setUserData(newUserData);
    
    // Save to localStorage if user is logged in
    if (currentUser) {
      localStorage.setItem(`userData_${currentUser.id}`, JSON.stringify(newUserData));
    }
  };

  const handleLogin = async (user) => {
    try {
      // In a real app, you would verify credentials with your backend
      AuthService.login(user);
      setCurrentUser(user);
      
      // Load user data if exists
      const savedUserData = localStorage.getItem(`userData_${user.id}`);
      if (savedUserData) {
        setUserData(JSON.parse(savedUserData));
      }
      
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    // Don't clear userData to maintain it if user logs back in
  };

  const handleRegister = async (user) => {
    try {
      // In a real app, you would register with your backend
      AuthService.register(user);
      setCurrentUser(user);
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="App">
        {currentUser && <Navigation onLogout={handleLogout} />}
        <div className="content">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={
              currentUser ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />
            } />
            <Route path="/register" element={
              currentUser ? <Navigate to="/" replace /> : <RegisterPage onRegister={handleRegister} />
            } />

            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/measurements" element={
              <ProtectedRoute>
                <Measurements userData={userData} updateUserData={updateUserData} />
              </ProtectedRoute>
            } />
            <Route path="/body-type-input" element={
              <ProtectedRoute>
                <BodyTypeInput userData={userData} updateUserData={updateUserData} />
              </ProtectedRoute>
            } />
            <Route path="/photo-upload" element={
              <ProtectedRoute>
                <PhotoUploadPage userData={userData} updateUserData={updateUserData} />
              </ProtectedRoute>
            } />
            <Route path="/occasion" element={
              <ProtectedRoute>
                <OccasionPage userData={userData} updateUserData={updateUserData} />
              </ProtectedRoute>
            } />
            <Route path="/body-type-suggestions" element={
              <ProtectedRoute>
                <BodyTypeSuggestions userData={userData} />
              </ProtectedRoute>
            } />
            <Route path="/color-suggestions" element={
              <ProtectedRoute>
                <ColorSuggestions userData={userData} />
              </ProtectedRoute>
            } />
            <Route path="/occasion-suggestions" element={
              <ProtectedRoute>
                <OccasionSuggestions userData={userData} />
              </ProtectedRoute>
            } />
            <Route path="/personalized-suggestions" element={
              <ProtectedRoute>
                <PersonalizedSuggestions userData={userData} />
              </ProtectedRoute>
            } />
            <Route path="//occasion-outfits" element={
              <ProtectedRoute>
                <OccasionOutfit userData={userData} />
              </ProtectedRoute>
            } />

            {/* Redirect to login for any unknown routes if not authenticated */}
            <Route path="*" element={
              currentUser ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;