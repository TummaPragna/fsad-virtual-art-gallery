import { Link, useNavigate } from "react-router-dom";
import { getRole, logout } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const role = getRole();

  
const handleLogout = () => {
  localStorage.clear();
  navigate("/");
};

  return (
    <div className="navbar">
      <div className="navbar-inner">
        <h2>🎨 Virtual Art Gallery</h2>

        <div>
          <Link to="/">Home</Link>
          <Link to="/tour">Virtual Tour</Link>

          {/* Show links based on role */}
          {role === "Artist" && <Link to="/artist">Artist Panel</Link>}
          {role === "Admin" && <Link to="/admin">Admin</Link>}
          {role === "Curator" && <Link to="/curator">Curator</Link>}

          {/* If not logged in */}
          {!role && <Link to="/login">Login</Link>}

          {/* If logged in */}
          {role && (
            <>
              <span style={{ marginLeft: "20px", color: "#fff" }}>
                👤 {role}
              </span>

              <button
                style={{ marginLeft: "15px" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;