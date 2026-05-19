import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Sidebar from './UI/components/Sidebar';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
