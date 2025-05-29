import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import getCurrentUser from "../../utils/getCurrentUser";

function Profile() {
  const currentUser = getCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    country: currentUser?.country || "",
    phone: currentUser?.phone || "",
    desc: currentUser?.desc || "",
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`users/${currentUser._id}`).then((res) => {
        console.log("User Response:", res.data);
        return res.data;
      }),
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await newRequest.put(`users/${currentUser._id}`, editedUser);
      setIsEditing(false);
      // Update local storage with new user data
      const updatedUser = { ...currentUser, ...editedUser };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      window.location.reload(); // Refresh to show updated data
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleCancel = () => {
    setEditedUser({
      username: currentUser?.username || "",
      email: currentUser?.email || "",
      country: currentUser?.country || "",
      phone: currentUser?.phone || "",
      desc: currentUser?.desc || "",
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h1 style={styles.title}>My Profile</h1>
        
        {isLoading ? (
          "Loading..."
        ) : error ? (
          <div style={styles.error}>
            Error: {error.message || "Something went wrong!"}
          </div>
        ) : (
          <div style={styles.profile}>
            <div style={styles.profileHeader}>
              <div style={styles.avatar}>
                {currentUser?.img ? (
                  <img src={currentUser.img} alt="Profile" style={styles.avatarImage} />
                ) : (
                  <div style={styles.avatarPlaceholder}>
                    {currentUser?.username?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <h2 style={styles.username}>{currentUser?.username}</h2>
            </div>

            <div style={styles.profileDetails}>
              {isEditing ? (
                <>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={editedUser.username}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editedUser.email}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Country</label>
                    <input
                      type="text"
                      name="country"
                      value={editedUser.country}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={editedUser.phone}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Description</label>
                    <textarea
                      name="desc"
                      value={editedUser.desc}
                      onChange={handleChange}
                      style={styles.textarea}
                    />
                  </div>
                  <div style={styles.buttonGroup}>
                    <button onClick={handleSave} style={styles.saveButton}>
                      Save Changes
                    </button>
                    <button onClick={handleCancel} style={styles.cancelButton}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div style={styles.detailGroup}>
                    <label style={styles.label}>Email</label>
                    <p style={styles.detail}>{currentUser?.email}</p>
                  </div>
                  <div style={styles.detailGroup}>
                    <label style={styles.label}>Country</label>
                    <p style={styles.detail}>{currentUser?.country}</p>
                  </div>
                  <div style={styles.detailGroup}>
                    <label style={styles.label}>Phone</label>
                    <p style={styles.detail}>{currentUser?.phone || "Not provided"}</p>
                  </div>
                  <div style={styles.detailGroup}>
                    <label style={styles.label}>Description</label>
                    <p style={styles.detail}>{currentUser?.desc || "No description provided"}</p>
                  </div>
                  {/* <button onClick={handleEdit} style={styles.editButton}>
                    Edit Profile
                  </button> */}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f4f4f4",
    padding: "20px",
  },
  wrapper: {
    background: "white",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "800px",
    width: "100%",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "30px",
    textAlign: "center",
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  profileHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    overflow: "hidden",
    background: "#e0e0e0",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  avatarPlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "48px",
    color: "#666",
    background: "#e0e0e0",
  },
  username: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#333",
  },
  profileDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  detailGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    fontSize: "14px",
    color: "#666",
    fontWeight: "500",
  },
  detail: {
    fontSize: "16px",
    color: "#333",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    minHeight: "100px",
    resize: "vertical",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },
  editButton: {
    padding: "10px 20px",
    background: "#1dbf73",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background 0.3s",
  },
  saveButton: {
    padding: "10px 20px",
    background: "#1dbf73",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background 0.3s",
  },
  cancelButton: {
    padding: "10px 20px",
    background: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background 0.3s",
  },
  error: {
    color: "red",
    textAlign: "center",
    padding: "20px",
    background: "#fff5f5",
    borderRadius: "8px",
    border: "1px solid #ffcdd2",
  },
};

export default Profile; 