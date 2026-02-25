import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";

function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const role = localStorage.getItem("selectedRole");

  // If user opens /auth directly → send back
  useEffect(() => {
    if (!role) navigate("/login");
  }, [role, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    login(role); // Save login permanently
    localStorage.removeItem("selectedRole");

    // Redirect based on role
    if (role === "Artist") {
  navigate("/artist");
}
else if (role === "Admin") {
  navigate("/admin");
}
else if (role === "Curator") {
  navigate("/curator");
}
else {
  navigate("/home");
}
  };

  return (
    <div className="auth-page">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>{role} Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login / Sign Up</button>
      </form>
    </div>
  );
}

export default Auth;