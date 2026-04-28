import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const role = localStorage.getItem("selectedRole");

  useEffect(() => {
    if (!role) navigate("/login");
  }, [role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 🔴 VALIDATION
    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const url = isSignup
        ? "http://localhost:8081/api/auth/signup"
        : "http://localhost:8081/api/auth/login";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {}

      // ❌ ERROR HANDLING
      if (!response.ok) {
        if (typeof data === "string") setError(data);
        else if (data.message) setError(data.message);
        else setError("Invalid credentials");
        return;
      }

      // ✅ SIGNUP SUCCESS
      if (isSignup) {
        setError("Signup successful! Now login.");
        setIsSignup(false);
        setPassword("");
        setConfirmPassword("");
        return;
      }

      // 🔥 LOGIN SUCCESS (IMPORTANT FIX)
      if (!data.token) {
        setError("Login failed: No token received");
        return;
      }

      // ✅ STORE TOKEN
      localStorage.setItem("token", data.token);

      // ✅ STORE USER CLEANLY
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.name,
          role: data.role,
        })
      );

      // 🚀 REDIRECT BASED ON ROLE
      if (data.role === "ADMIN") navigate("/admin");
      else if (data.role === "ARTIST") navigate("/artist");
      else if (data.role === "CURATOR") navigate("/curator");
      else navigate("/home");

    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>{isSignup ? "Signup" : "Login"}</h2>

        {/* NAME */}
        {isSignup && (
          <input
            type="text"
            placeholder="Enter Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* CONFIRM PASSWORD */}
        {isSignup && (
          <input
            type="password"
            placeholder="Confirm Password"
            required
            minLength={6}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        {/* ERROR */}
        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>
            {error}
          </p>
        )}

        <button type="submit">
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p
          style={{
            marginTop: "10px",
            cursor: "pointer",
            color: "#6c63ff",
          }}
          onClick={() => {
            setIsSignup(!isSignup);
            setError("");
          }}
        >
          {isSignup
            ? "Already have an account? Login"
            : "New user? Sign up"}
        </p>
      </form>
    </div>
  );
}

export default Auth;