import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProject, reset } from '../../store/slices/projectSlice';
import ProjectForm from '../components/ProjectForm';
import '../components/ProjectManagement.css';

const CreateProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    if (isSuccess) {
      dispatch(reset());
      navigate('/projects');
    }
  }, [user, isSuccess, navigate, dispatch]);

  const handleSubmit = (formData) => {
    dispatch(createProject(formData));
  };

  const handleCancel = () => {
    navigate('/projects');
  };

  return (
    <div className="page-container" style={{ paddingTop: '3rem' }}>
      <div className="form-container">
        <div style={{ background: 'var(--primary)', margin: '-2.5rem -2.5rem 2.5rem -2.5rem', padding: '2rem 2.5rem', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
          <h2 style={{ color: 'white', fontSize: '1.75rem', fontWeight: '800', margin: 0 }}>Launch New Venture</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.5rem' }}>Share your vision with the world</p>
        </div>
        
        {isError && (
          <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '1rem', marginBottom: '2rem', borderRadius: '0.5rem' }}>
            <p style={{ color: '#991b1b', fontSize: '0.875rem' }}>{message}</p>
          </div>
        )}

        <ProjectForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CreateProject;
