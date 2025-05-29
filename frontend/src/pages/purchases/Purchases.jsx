import React from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import getCurrentUser from "../../utils/getCurrentUser";

function Purchases() {
  const currentUser = getCurrentUser();
  console.log("Current User:", currentUser); // Debug log

  const { isLoading, error, data } = useQuery({
    queryKey: ["purchases"],
    queryFn: () =>
      newRequest.get(`orders?buyerId=${currentUser._id}`).then((res) => {
        console.log("Purchases Response:", res.data); // Debug log
        return res.data;
      }),
  });

  console.log("Purchases Data:", data); // Debug log
  console.log("Loading:", isLoading); // Debug log
  console.log("Error:", error); // Debug log

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h1 style={styles.title}>My Purchases</h1>
        
        {isLoading ? (
          "Loading..."
        ) : error ? (
          <div style={styles.error}>
            Error: {error.message || "Something went wrong!"}
          </div>
        ) : !data || data.length === 0 ? (
          <div style={styles.noPurchases}>
            <p style={styles.text}>You haven't made any purchases yet.</p>
          </div>
        ) : (
          <div style={styles.purchases}>
            {data.map((purchase) => (
              <div key={purchase._id} style={styles.purchase}>
                <div style={styles.purchaseHeader}>
                  <h2 style={styles.purchaseTitle}>{purchase.title}</h2>
                  <span style={styles.purchaseStatus}>
                    {purchase.isCompleted ? "Completed" : "In Progress"}
                  </span>
                </div>
                
                <div style={styles.purchaseDetails}>
                  <p style={styles.text}>Price: ${purchase.price}</p>
                  <p style={styles.text}>Purchase Date: {new Date(purchase.createdAt).toLocaleDateString()}</p>
                  <p style={styles.text}>Seller ID: {purchase.sellerId}</p>
                </div>
                
                {purchase.isCompleted && (
                  <div style={styles.reviewSection}>
                    <p style={styles.text}>Would you like to leave a review?</p>
                    <button
                      onClick={() => window.location.href = `/gig/${purchase.gigId}`}
                      style={styles.reviewButton}
                    >
                      Write a Review
                    </button>
                  </div>
                )}
              </div>
            ))}
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
  purchases: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  purchase: {
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
  },
  purchaseHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  purchaseTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#444",
  },
  purchaseStatus: {
    padding: "5px 10px",
    background: "#1dbf73",
    color: "white",
    borderRadius: "4px",
    fontSize: "14px",
  },
  purchaseDetails: {
    marginBottom: "15px",
  },
  text: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "8px",
  },
  reviewSection: {
    marginTop: "15px",
    paddingTop: "15px",
    borderTop: "1px solid #e0e0e0",
  },
  reviewButton: {
    padding: "8px 16px",
    background: "#1dbf73",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
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
  noPurchases: {
    textAlign: "center",
    padding: "20px",
    background: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #e9ecef",
  },
};

export default Purchases; 