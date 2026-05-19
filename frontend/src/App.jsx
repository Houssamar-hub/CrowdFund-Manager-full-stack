<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Sidebar from './UI/components/Sidebar';
import './UI/components/ProjectManagement.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <AppRoutes />
        </main>
      </div>
    </Router>
=======
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./UI/components/Sidebar";
import Dashboard from "./UI/pages/Dashboard";
import Projects from "./UI/pages/Projects";
import CreateProject from "./UI/pages/CreateProject";
import Login from "./UI/pages/Login";
import Register from "./UI/pages/Register";

function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function PublicRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  
  if (token) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

function App() {
  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />

      <Route
        path="/*"
        element={
          <PrivateRoute>
            <div style={{ display: "flex" }}>
              <Sidebar />
              <div style={{ flex: 1, marginLeft: "280px", padding: "20px" }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/create-project" element={<CreateProject />} />
                  <Route path="*" element={<h1>404 - Page not found</h1>} />
                </Routes>
              </div>
            </div>
          </PrivateRoute>
        }
      />
    </Routes>
>>>>>>> f007301275f37080fbfbd8fc8073737b29d81c58
  );
}

export default App;
