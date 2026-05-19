import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectById, updateProject, deleteProject, closeProject } from '../../store/slices/projectSlice';
import ProjectForm from '../components/ProjectForm';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const { selectedProject, isLoading, isError, message } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(getProjectById(id));
  }, [id, user, navigate, dispatch]);

  const handleUpdate = (formData) => {
    dispatch(updateProject({ id, projectData: formData })).then((res) => {
      if (!res.error) setIsEditing(false);
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(id)).then(() => navigate('/projects'));
    }
  };

  const handleClose = () => {
    if (window.confirm('Are you sure you want to close this project?')) {
      dispatch(closeProject(id));
    }
  };

  if (isLoading && !selectedProject) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!selectedProject) return <div className="p-8 text-center">Project not found.</div>;

  const percentage = (selectedProject.currentCapital / selectedProject.capital) * 100 || 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isEditing ? (
          <div className="p-8">
            <h2 className="text-xl font-bold mb-6">Edit Project</h2>
            <ProjectForm
              initialData={selectedProject}
              onSubmit={handleUpdate}
              onCancel={() => setIsEditing(false)}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <div>
            <div className="px-8 py-8 border-b border-gray-50 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{selectedProject.title}</h1>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    selectedProject.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {selectedProject.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-500">ID: {selectedProject._id}</p>
              </div>
              <div className="flex gap-3">
                {selectedProject.status === 'open' && (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleClose}
                      className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium"
                    >
                      Close Campaign
                    </button>
                  </>
                )}
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About this project</h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Investors ({selectedProject.investments?.length || 0})</h3>
                  <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                          <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Investor</th>
                          <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Amount</th>
                          <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase">% Equity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {(selectedProject.investments || []).map((inv, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm text-gray-900">{inv.investorId?.name || 'Anonymous'}</td>
                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">${inv.amount.toLocaleString()}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {((inv.amount / selectedProject.capital) * 100).toFixed(2)}%
                            </td>
                          </tr>
                        ))}
                        {(!selectedProject.investments || selectedProject.investments.length === 0) && (
                          <tr>
                            <td colSpan="3" className="px-6 py-8 text-center text-gray-500 text-sm">No investments yet.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                  <h3 className="text-indigo-900 font-bold text-lg mb-4">Funding Status</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-indigo-700 font-medium">{Math.round(percentage)}% Funded</span>
                        <span className="text-indigo-900 font-bold">${(selectedProject.currentCapital || 0).toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-indigo-200 rounded-full h-3">
                        <div 
                          className="bg-indigo-600 h-3 rounded-full" 
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-indigo-600 font-medium uppercase tracking-wider mb-1">Target Capital</p>
                      <p className="text-2xl font-black text-indigo-900">${selectedProject.capital.toLocaleString()}</p>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-indigo-600 font-medium uppercase tracking-wider mb-1">Max per Investor</p>
                      <p className="text-lg font-bold text-indigo-900">{selectedProject.maxInvestmentPercent}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
