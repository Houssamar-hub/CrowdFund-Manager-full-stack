import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectManagement.css';

const ProjectCard = ({ project, onDelete, onUpdate }) => {
  const percentage = (project.currentCapital / project.capital) * 100 || 0;

  return (
    <div className="pm-card">
      <div className="pm-card-gradient"></div>
      <div className="pm-card-body">
        <div className="pm-card-header">
          <h3 className="pm-card-title">{project.title}</h3>
          <span className={`pm-badge ${
            project.status === 'open' ? 'pm-badge-open' : 'pm-badge-closed'
          }`}>
            {project.status}
          </span>
        </div>
        
        <p className="pm-card-description">
          {project.description}
        </p>

        <div className="pm-progress-container">
          <div>
            <div className="pm-progress-header">
              <span>Funding Progress</span>
              <span style={{ color: 'var(--primary-color)' }}>{Math.round(percentage)}%</span>
            </div>
            <div className="pm-progress-bar-bg">
              <div 
                className="pm-progress-bar-fill" 
                style={{ width: `${Math.min(percentage, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="pm-stats-grid">
            <div className="pm-stat-box">
              <p className="pm-stat-label">Target Goal</p>
              <p className="pm-stat-value">${project.capital.toLocaleString()}</p>
            </div>
            <div className="pm-stat-box" style={{ textAlign: 'right' }}>
              <p className="pm-stat-label">Currently Raised</p>
              <p className="pm-stat-value pm-stat-value-highlight">${(project.currentCapital || 0).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="pm-card-footer">
          <Link 
            to={`/projects/${project._id}`}
            className="pm-link"
          >
            Explore Campaign
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <div className="pm-action-buttons">
            {project.status === 'open' && (
              <button 
                onClick={() => onUpdate(project)}
                className="pm-icon-btn pm-icon-btn-edit"
                title="Edit Project"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
            <button 
              onClick={() => onDelete(project._id)}
              className="pm-icon-btn pm-icon-btn-delete"
              title="Delete Project"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v2m3 5h4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
