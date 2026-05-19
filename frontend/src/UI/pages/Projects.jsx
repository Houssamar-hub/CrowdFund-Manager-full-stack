import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getMyProjects, deleteProject } from '../../store/slices/projectSlice';
import ProjectCard from '../components/ProjectCard';
import '../components/ProjectManagement.css';

const Projects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, isLoading, isError, message } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(getMyProjects());
  }, [user, navigate, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(id));
    }
  };

  const handleUpdate = (project) => {
    navigate(`/projects/${project._id}`);
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div className="pm-spinner" style={{ width: '3rem', height: '3rem', border: '4px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="flex-between mb-8">
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>My Projects</h1>
          <p style={{ color: 'var(--text-gray)' }}>Manage and track your fundraising campaigns</p>
        </div>
        <Link to="/projects/create" className="pm-btn-primary">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </Link>
      </div>

      {isError && (
        <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '1rem', marginBottom: '2rem', borderRadius: '0.5rem' }}>
          <p style={{ color: '#991b1b', fontSize: '0.875rem' }}>{message}</p>
        </div>
      )}

      {projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'white', borderRadius: '1rem', border: '2px dashed var(--border)' }}>
          <svg width="48" height="48" style={{ color: 'var(--text-light)', marginBottom: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>No projects found</h3>
          <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>Get started by creating your first project.</p>
          <Link to="/projects/create" className="pm-btn-primary">
            Create Project
          </Link>
        </div>
      ) : (
        <div className="grid-3">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
