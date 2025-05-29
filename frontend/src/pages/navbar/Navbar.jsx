import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // ✅ Safely get `currentUser` to prevent app crash
  let currentUser;
  try {
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
  } catch (error) {
    currentUser = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <h2 style={styles.logo}>
          <Link to="/" style={styles.link}>SkillExchange</Link>
        </h2>

        <div style={styles.links}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/gigs" style={styles.link}>Explore</Link>
          
          
          {!currentUser ? (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.link}>Register</Link>
            </>
          ) : (
            <>
            <Link to="/add" style={styles.link}>Add Skill</Link>
            <Link to="/myGigs" style={styles.link}>My Skills</Link>
            <Link to="/orders" style={styles.link}>My Orders</Link>
            <Link to="/purchases" style={styles.link}>My Purchases</Link>
            <Link to="/profile" style={styles.link}>Profile</Link>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    background: "#007bff",
    padding: "15px 0",
    color: "white",
    width: "100%",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%", 
    maxWidth: "1200px",
    margin: "0 auto",
    height: "40px", 
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "10px", // ✅ Better spacing
    transition: "color 0.3s ease",
  },
  logoutButton: {
    background: "red",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.3s ease",
  },
};

export default Navbar;
