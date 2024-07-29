import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import AdminDashboard from './views/AdminDashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './views/Profile';
import Experiences from './views/Experiences';
import Forum from './views/Forum';
import Connect from './views/Connect';
import ExperienceList from './views/ExperienceList';
import ExperienceForm from './views/ExperienceForm';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<NavbarWrapper><Home /></NavbarWrapper>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute allowedRoles={[4, 6]} />}>
            <Route path="/dashboard" element={<NavbarWrapper><Dashboard /></NavbarWrapper>} />
            <Route path="/profile" element={<NavbarWrapper><Profile /></NavbarWrapper>} />
            <Route path="/experiences" element={<NavbarWrapper><Experiences /></NavbarWrapper>} />
            <Route path="/forum" element={<NavbarWrapper><Forum /></NavbarWrapper>} />
            <Route path="/connect" element={<NavbarWrapper><Connect /></NavbarWrapper>} />
            <Route path="/experience-list" element={<NavbarWrapper><ExperienceList /></NavbarWrapper>} />
            <Route path="/experience-form" element={<NavbarWrapper><ExperienceForm /></NavbarWrapper>} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={[4]} />}>
            <Route path="/admin" element={<NavbarWrapper><AdminDashboard /></NavbarWrapper>} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

const NavbarWrapper = ({ children }) => {
  const { pathname } = window.location;
  if (pathname === '/login' || pathname === '/register') {
    return children;
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default App;
