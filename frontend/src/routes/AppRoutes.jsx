import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Projects from '../UI/pages/Projects';
import CreateProject from '../UI/pages/CreateProject';
import ProjectDetails from '../UI/pages/ProjectDetails';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/projects" />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/create" element={<CreateProject />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="*" element={<Navigate to="/projects" />} />
    </Routes>
  );
};

export default AppRoutes;
