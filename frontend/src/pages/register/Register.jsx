import React, { useState } from "react";
import upload from "../../utils/upload";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSeller = (e) => {
    setUser((prev) => ({ ...prev, isSeller: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const url = file ? await upload(file) : "";
  
    const userData = {
      ...user,
      img: url,
    };
  
    console.log("Sending user data:", userData); // Debugging step
  
    try {
      await newRequest.post("/auth/register", userData);
      navigate("/");
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err);
    }
  };
  

  return (
    <div style={styles.register}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.left}>
          <h1 style={styles.heading}>Create an Account</h1>

          <label style={styles.label}>Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>Email</label>
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>Profile Picture</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={styles.fileInput}
          />

          <label style={styles.label}>Country</label>
          <input
            name="country"
            type="text"
            placeholder="Enter country"
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.right}>
          <h1 style={styles.heading}>Become a Seller</h1>

          <div style={styles.toggle}>
            <label style={styles.label}>Activate Seller Account</label>
            <input type="checkbox" onChange={handleSeller} />
          </div>

          <label style={styles.label}>Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 890"
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>Description</label>
          <textarea
            name="desc"
            placeholder="Tell us about yourself..."
            rows="4"
            onChange={handleChange}
            style={styles.textarea}
          ></textarea>

          <button type="submit" style={styles.button}>Register</button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  register: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    background: "#f8f9fa",
    padding: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    width: "700px",
    justifyContent: "space-between",
    gap: "20px",
  },
  left: {
    display: "flex",
    flexDirection: "column",
    width: "48%",
  },
  right: {
    display: "flex",
    flexDirection: "column",
    width: "48%",
  },
  heading: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "15px",
    textAlign: "center",
  },
  label: {
    fontSize: "14px",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
    marginBottom: "15px",
    outline: "none",
    width: "100%",
    transition: "border-color 0.3s",
  },
  inputFocus: {
    borderColor: "#007bff",
  },
  fileInput: {
    padding: "5px",
    marginBottom: "15px",
    fontSize: "14px",
  },
  textarea: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    resize: "none",
  },
  button: {
    padding: "12px",
    border: "none",
    background: "#007bff",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s",
    marginTop: "10px",
  },
  buttonHover: {
    background: "#0056b3",
  },
  toggle: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
  },
};

export default Register;
