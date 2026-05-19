import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";  // ← نزيدو هاد
import Sidebar from "./UI/components/Sidebar";
import Dashboard from "./UI/pages/Dashboard";
import Projects from "./UI/pages/Projects";
import CreateProject from "./UI/pages/CreateProject";
import Login from "./UI/pages/Login";
import Register from "./UI/pages/Register";

function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.auth);  // ← نزيدو هاد
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/*"
        element={
          <PrivateRoute>
            <div style={{ display: "flex" }}>
              <Sidebar />
              <div style={{ flex: 1, marginLeft: "280px", padding: "20px" }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/create-project" element={<CreateProject />} />
                </Routes>
              </div>
            </div>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;