import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Home Page</h1>
      <p style={styles.text}>
        This is the homepage of your application. Feel free to explore and navigate through different sections.
      </p>
      <button style={styles.button} onClick={() => navigate("/gigs")}>
        Get Started
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    background: "#f4f4f4",
    textAlign: "center",
  },
  heading: {
    fontSize: "32px",
    color: "#333",
    marginBottom: "10px",
  },
  text: {
    fontSize: "18px",
    color: "#666",
    maxWidth: "600px",
    marginBottom: "20px",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    border: "none",
    background: "#007bff",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default Home;
