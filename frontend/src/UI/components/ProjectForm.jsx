import React, { useState, useEffect } from 'react';
import './ProjectManagement.css';

const ProjectForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    capital: '',
    maxInvestmentPercent: 50,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        capital: initialData.capital || '',
        maxInvestmentPercent: initialData.maxInvestmentPercent || 50,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'capital' || name === 'maxInvestmentPercent' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="pm-form">
      <div className="pm-form-section">
        <div className="pm-field-group">
          <label className="pm-label">Project Identity</label>
          <div className="pm-input-wrapper">
            <div className="pm-input-icon">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="pm-input pm-input-with-icon"
              placeholder="e.g. Revolutionary Eco-Tech"
            />
          </div>
        </div>

        <div className="pm-field-group">
          <label className="pm-label">Project Narrative</label>
          <textarea
            name="description"
            rows="5"
            required
            value={formData.description}
            onChange={handleChange}
            className="pm-textarea"
            placeholder="Tell your story and inspire potential investors..."
          ></textarea>
        </div>

        <div className="pm-form-grid">
          <div className="pm-field-group">
            <label className="pm-label">Financial Goal ($)</label>
            <div className="pm-input-wrapper">
              <div className="pm-input-icon">
                <span style={{ fontWeight: '700', fontSize: '1.125rem' }}>$</span>
              </div>
              <input
                type="number"
                name="capital"
                required
                min="1"
                value={formData.capital}
                onChange={handleChange}
                className="pm-input pm-input-with-icon"
                placeholder="10,000"
                style={{ fontWeight: '700' }}
              />
            </div>
          </div>

          <div className="pm-field-group">
            <label className="pm-label">Investor Ceiling (%)</label>
            <div className="pm-input-wrapper">
              <div className="pm-input-suffix">
                <span>%</span>
              </div>
              <input
                type="number"
                name="maxInvestmentPercent"
                required
                min="1"
                max="100"
                value={formData.maxInvestmentPercent}
                onChange={handleChange}
                className="pm-input"
                placeholder="20"
                style={{ fontWeight: '700', paddingRight: '2.5rem' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pm-form-actions">
        <button
          type="button"
          onClick={onCancel}
          className="pm-btn pm-btn-secondary"
        >
          Discard
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="pm-btn pm-btn-primary"
        >
          {isLoading ? (
            <>
              <svg className="pm-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Launching...
            </>
          ) : (
            <>
              {initialData ? 'Update Venture' : 'Launch Campaign'}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
