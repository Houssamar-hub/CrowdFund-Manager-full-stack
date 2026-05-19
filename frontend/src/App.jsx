import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./UI/components/Sidebar";

import Dashboard from "./UI/pages/Dashboard";
import Projects from "./UI/pages/Projects";
import CreateProject from "./UI/pages/CreateProject";



function App() {
  return (
    <div className="app">
      <Sidebar />

      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/create-project" element={<CreateProject />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;