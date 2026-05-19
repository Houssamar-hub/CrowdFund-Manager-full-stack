import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectById, updateProject, deleteProject, closeProject } from '../../store/slices/projectSlice';
import ProjectForm from '../components/ProjectForm';
import '../components/ProjectManagement.css';

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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div className="pm-spinner" style={{ width: '3rem', height: '3rem', border: '4px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
      </div>
    );
  }

  if (!selectedProject) return <div style={{ padding: '2rem', textAlign: 'center' }}>Project not found.</div>;

  const percentage = (selectedProject.currentCapital / selectedProject.capital) * 100 || 0;

  return (
    <div className="page-container">
      <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
        {isEditing ? (
          <div style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Edit Project</h2>
            <ProjectForm
              initialData={selectedProject}
              onSubmit={handleUpdate}
              onCancel={() => setIsEditing(false)}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <div>
            <div style={{ padding: '2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: 0 }}>{selectedProject.title}</h1>
                  <span className={`pm-badge ${selectedProject.status === 'open' ? 'pm-badge-open' : 'pm-badge-closed'}`}>
                    {selectedProject.status}
                  </span>
                </div>
                <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>ID: {selectedProject._id}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {selectedProject.status === 'open' && (
                  <>
                    <button onClick={() => setIsEditing(true)} className="pm-btn pm-btn-secondary" style={{ border: '1px solid var(--border)' }}>
                      Edit
                    </button>
                    <button onClick={handleClose} className="pm-btn" style={{ background: '#f59e0b', color: 'white' }}>
                      Close Campaign
                    </button>
                  </>
                )}
                <button onClick={handleDelete} className="pm-btn" style={{ background: '#ef4444', color: 'white' }}>
                  Delete
                </button>
              </div>
            </div>

            <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
              {/* Responsive Grid - would normally use CSS classes but doing inline for quick fix */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1rem' }}>About this project</h3>
                  <p style={{ color: 'var(--text-gray)', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1rem' }}>Investors ({selectedProject.investments?.length || 0})</h3>
                  <div style={{ background: '#f9fafb', borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead style={{ background: '#f3f4f6' }}>
                        <tr>
                          <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Investor</th>
                          <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-gray)', textTransform: 'uppercase' }}>Amount</th>
                          <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-gray)', textTransform: 'uppercase' }}>% Equity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(selectedProject.investments || []).map((inv, idx) => (
                          <tr key={idx} style={{ borderTop: '1px solid var(--border)' }}>
                            <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{inv.investorId?.name || 'Anonymous'}</td>
                            <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600' }}>${inv.amount.toLocaleString()}</td>
                            <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                              {((inv.amount / selectedProject.capital) * 100).toFixed(2)}%
                            </td>
                          </tr>
                        ))}
                        {(!selectedProject.investments || selectedProject.investments.length === 0) && (
                          <tr>
                            <td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.875rem' }}>No investments yet.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div style={{ background: '#eef2ff', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e0e7ff' }}>
                <h3 style={{ color: 'var(--primary)', fontWeight: '800', marginBottom: '1.5rem' }}>Funding Status</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--primary)' }}>{Math.round(percentage)}% Funded</span>
                      <span>${(selectedProject.currentCapital || 0).toLocaleString()}</span>
                    </div>
                    <div style={{ background: '#cbd5e1', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: 'var(--primary)', width: `${Math.min(percentage, 100)}%`, transition: 'width 0.5s' }}></div>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.625rem', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Target Goal</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: '900' }}>${selectedProject.capital.toLocaleString()}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.625rem', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Ceiling</p>
                    <p style={{ fontSize: '1.125rem', fontWeight: '700' }}>{selectedProject.maxInvestmentPercent}% per Investor</p>
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
