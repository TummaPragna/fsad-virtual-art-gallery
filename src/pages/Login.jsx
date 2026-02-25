import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logout } from "../utils/auth";


function Login() {
  const navigate = useNavigate();

  // Clear previous login when entering role selection
  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleSelectRole = (role) => {
    localStorage.setItem("selectedRole", role);
    navigate("/auth");
  };

  return (
  <div className="role-page">
    <div className="role-overlay">
      <div className="role-container">
        <h2>Select Your Role</h2>

        <div className="role-grid">
          <div className="role-card" onClick={() => handleSelectRole("Visitor")}>
            <h3>Visitor</h3>
            <p>Browse artworks and explore the gallery.</p>
          </div>

          <div className="role-card" onClick={() => handleSelectRole("Artist")}>
            <h3>Artist</h3>
            <p>Upload and manage your artworks.</p>
          </div>

          <div className="role-card" onClick={() => handleSelectRole("Curator")}>
            <h3>Curator</h3>
            <p>Vette and organize exhibitions.</p>
          </div>

          <div className="role-card" onClick={() => handleSelectRole("Admin")}>
            <h3>Admin</h3>
            <p>Control gallery & manage users.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default Login;