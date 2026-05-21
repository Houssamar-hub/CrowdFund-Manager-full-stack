import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMyProjects, fetchOpenProjects } from '../../store/slices/projectSlice';
import { Search, Plus, Eye, Trash2, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

const Projects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, userRole, user } = useSelector((state) => state.auth);
  const { projects, openProjects, isLoading } = useSelector((state) => state.projects);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    
    console.log("🔐 User role:", userRole);
    console.log("👤 User info:", user);
    
    // Charger les projets selon le rôle
    if (userRole === 'owner') {
      console.log("📋 Loading owner's projects...");
      dispatch(fetchMyProjects());
    } else if (userRole === 'investor') {
      console.log("📋 Loading open projects for investor...");
      dispatch(fetchOpenProjects());
    } else {
      // Si pas de rôle spécifique, charger les projets ouverts par défaut
      console.log("📋 No specific role, loading open projects...");
      dispatch(fetchOpenProjects());
    }
  }, [dispatch, token, navigate, userRole]);

  // Afficher les projets selon le rôle
  const displayProjects = userRole === 'owner' ? projects : openProjects;
  const title = userRole === 'owner' ? 'My Projects' : 'Open Projects';
  const description = userRole === 'owner' 
    ? 'Manage and monitor all your fundraising campaigns'
    : 'Discover and invest in promising projects';

  console.log("📊 Display projects:", displayProjects?.length);
  console.log("📊 Projects from store:", projects?.length);
  console.log("📊 Open projects from store:", openProjects?.length);

  const filteredProjects = displayProjects?.filter(project =>
    project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateProgress = (project) => {
    const totalInvested = project.investments?.reduce((sum, inv) => sum + (inv.amount || 0), 0) || 0;
    return (totalInvested / project.capital) * 100;
  };

  const getTotalInvested = (project) => {
    return project.investments?.reduce((sum, inv) => sum + (inv.amount || 0), 0) || 0;
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        // Implémenter la suppression
        toast.success('Project deleted');
        dispatch(fetchMyProjects());
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '3px solid #e5e7eb', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>{title}</h1>
          <p style={{ color: '#6b7280' }}>{description}</p>
        </div>
        {userRole === 'owner' && (
          <button
            onClick={() => navigate('/projects/create')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            <Plus size={18} /> Create Project
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Search projects by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 12px 12px 40px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Projects Grid */}
      {!displayProjects || displayProjects.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '12px', padding: '60px', textAlign: 'center', color: '#9ca3af' }}>
          {userRole === 'owner' ? (
            <>
              <p style={{ marginBottom: '16px' }}>You haven't created any projects yet</p>
              <button
                onClick={() => navigate('/projects/create')}
                style={{
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Create Your First Project
              </button>
            </>
          ) : (
            <p>No open projects available at the moment</p>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '24px' }}>
          {filteredProjects.map((project) => {
            const progress = calculateProgress(project);
            const totalInvested = getTotalInvested(project);
            
            return (
              <div
                key={project._id}
                onClick={() => navigate(`/projects/${project._id}`)}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600' }}>{project.title}</h3>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    background: project.status === 'open' ? '#d1fae5' : '#fee2e2',
                    color: project.status === 'open' ? '#065f46' : '#991b1b'
                  }}>
                    {project.status}
                  </span>
                </div>
                
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '16px', lineHeight: '1.5' }}>
                  {project.description?.substring(0, 100)}...
                </p>

                {/* Progress Bar */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                    <span>Progress</span>
                    <span>{progress.toFixed(1)}%</span>
                  </div>
                  <div style={{ background: '#e5e7eb', borderRadius: '8px', height: '8px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${Math.min(progress, 100)}%`,
                      background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                      height: '100%'
                    }} />
                  </div>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <p style={{ fontSize: '11px', color: '#9ca3af' }}>Target Capital</p>
                    <p style={{ fontSize: '16px', fontWeight: '600' }}>{project.capital.toLocaleString()} DH</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: '#9ca3af' }}>Raised Capital</p>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#10b981' }}>{totalInvested.toLocaleString()} DH</p>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid #f3f4f6', paddingTop: '16px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/projects/${project._id}`);
                    }}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '8px',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <Eye size={14} /> View Details
                  </button>
                  
                  {userRole === 'investor' && project.status === 'open' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/projects/${project._id}/invest`);
                      }}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '8px',
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <DollarSign size={14} /> Invest
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Projects;