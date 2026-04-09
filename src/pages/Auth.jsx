import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const role = localStorage.getItem("selectedRole");

  // If user opens /auth directly → send back
  useEffect(() => {
    if (!role) navigate("/login");
  }, [role, navigate]);
const handleSubmit = async (e) => {
  e.preventDefault();
//commit2
  try {
    const response = await fetch("http://localhost:8081/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    // ✅ THIS IS IMPORTANT
    localStorage.setItem("user", JSON.stringify(data));

    const userRole = data.role;

    if (userRole === "ADMIN") navigate("/admin");
    else if (userRole === "ARTIST") navigate("/artist");
    else if (userRole === "CURATOR") navigate("/curator");
    else navigate("/home");

  } catch (err) {
    alert("Login failed");
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