import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiFolder,
  FiPlusCircle,
  FiLogOut,
} from "react-icons/fi";

function Sidebar() {
  return (
    <div className="sidebar">
      <div>
        <div className="logo">
          <h1>CrowdFund</h1>
          <p>PROJECT MANAGER</p>
        </div>

        <nav className="nav-links">
          <NavLink to="/" className="nav-item">
            <FiGrid />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/projects" className="nav-item">
            <FiFolder />
            <span>Projects</span>
          </NavLink>

          <NavLink to="/create-project" className="nav-item">
            <FiPlusCircle />
            <span>Create Project</span>
          </NavLink>
        </nav>
      </div>

      <div className="bottom-section">
        <div className="profile">
          <div className="avatar">J</div>

          <div>
            <h4>John Doe</h4>
            <p>john@example.com</p>
          </div>
        </div>

        <button className="logout-btn">
          <FiLogOut />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;