import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../store/slices/authSlice';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  const navItems = [
    { name: 'My Projects', path: '/projects', icon: 'folder' },
    { name: 'Launch New', path: '/projects/create', icon: 'plus' },
  ];

  const renderIcon = (name) => {
    switch (name) {
      case 'folder':
        return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>;
      case 'plus':
        return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>;
      default:
        return null;
    }
  };

  return (
    <div className="w-64 bg-indigo-900 text-white flex flex-col min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-wider text-indigo-400">CROWDFUND</h1>
        <p className="text-xs text-indigo-300 mt-1 uppercase font-semibold">Project Portal</p>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                isActive ? 'bg-indigo-700 text-white shadow-lg' : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
              }`
            }
          >
            {renderIcon(item.icon)}
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-indigo-800">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white uppercase">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{user?.name || 'Owner'}</p>
              <p className="text-xs text-indigo-300 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-indigo-200 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
