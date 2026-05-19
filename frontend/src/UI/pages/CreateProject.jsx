import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProject, reset } from '../../store/slices/projectSlice';
import ProjectForm from '../components/ProjectForm';

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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-8 py-6 bg-indigo-600">
          <h2 className="text-2xl font-bold text-white">Create New Project</h2>
          <p className="text-indigo-100 mt-1">Fill in the details to launch your campaign</p>
        </div>
        
        <div className="p-8">
          {isError && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded">
              <p className="text-sm text-red-700">{message}</p>
            </div>
          )}

          <ProjectForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
