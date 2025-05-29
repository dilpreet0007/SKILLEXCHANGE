import React, { useState } from "react";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      // After successful login, verify the cookie is set
      const checkAuth = await newRequest.get("/auth/check");
      if (checkAuth.status === 200) {
        navigate("/");
      } else {
        setError("Authentication failed. Please try logging in again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "An unexpected error occurred");
    }
  };

  return (
    <div style={styles.login}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.heading}>Sign in</h1>

        <label style={styles.label}>Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Login</button>

        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

const styles = {
  login: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",  // Ensures full width for proper centering
    background: "#f4f4f4",
    textAlign: "center", // Centers content inside
  },
  form: {
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "320px",
    textAlign: "left", // Aligns form elements properly
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  label: {
    fontSize: "14px",
    marginBottom: "5px",
    color: "#555",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    marginBottom: "15px",
    outline: "none",
    width: "100%",
  },
  button: {
    padding: "10px",
    border: "none",
    background: "#007bff",
    color: "white",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  error: {
    color: "red",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "10px",
  },
};

export default Login;
