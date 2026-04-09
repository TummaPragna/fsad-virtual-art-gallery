import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      if (user.role === "ADMIN") navigate("/admin");
      else if (user.role === "ARTIST") navigate("/artist");
      else if (user.role === "CURATOR") navigate("/curator");
      else navigate("/home");
    }
  }, [navigate]);
//commit1
  // Clear only selectedRole
  useEffect(() => {
    localStorage.removeItem("selectedRole");
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
            <div className="role-card" onClick={() => handleSelectRole("VISITOR")}>
              <h3>Visitor</h3>
              <p>Browse artworks and explore the gallery.</p>
            </div>

            <div className="role-card" onClick={() => handleSelectRole("ARTIST")}>
              <h3>Artist</h3>
              <p>Upload and manage your artworks.</p>
            </div>

            <div className="role-card" onClick={() => handleSelectRole("CURATOR")}>
              <h3>Curator</h3>
              <p>Vette and organize exhibitions.</p>
            </div>

            <div className="role-card" onClick={() => handleSelectRole("ADMIN")}>
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