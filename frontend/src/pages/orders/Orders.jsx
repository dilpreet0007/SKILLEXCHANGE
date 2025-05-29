import React from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import getCurrentUser from "../../utils/getCurrentUser";

function Orders() {
  const currentUser = getCurrentUser();
  console.log("Current User:", currentUser); // Debug log

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`orders`).then((res) => {
        console.log("Orders Response:", res.data); // Debug log
        return res.data;
      }),
  });

  console.log("Orders Data:", data); // Debug log
  console.log("Loading:", isLoading); // Debug log
  console.log("Error:", error); // Debug log

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h1 style={styles.title}>My Orders</h1>
        
        {isLoading ? (
          "Loading..."
        ) : error ? (
          <div style={styles.error}>
            Error: {error.message || "Something went wrong!"}
          </div>
        ) : !data || data.length === 0 ? (
          <div style={styles.noOrders}>
            <p style={styles.text}>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div style={styles.orders}>
            {data.map((order) => (
              <div key={order._id} style={styles.order}>
                <div style={styles.orderHeader}>
                  <h2 style={styles.orderTitle}>{order.title}</h2>
                  <span style={styles.orderStatus}>
                    {order.isCompleted ? "Completed" : "In Progress"}
                  </span>
                </div>
                
                <div style={styles.orderDetails}>
                  <p style={styles.text}>Price: ${order.price}</p>
                  <p style={styles.text}>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                
                {order.isCompleted && (
                  <div style={styles.reviewSection}>
                    <p style={styles.text}>Would you like to leave a review?</p>
                    <button
                      onClick={() => window.location.href = `/gig/${order.gigId}`}
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
  orders: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  order: {
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  orderTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#444",
  },
  orderStatus: {
    padding: "5px 10px",
    background: "#1dbf73",
    color: "white",
    borderRadius: "4px",
    fontSize: "14px",
  },
  orderDetails: {
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
  noOrders: {
    textAlign: "center",
    padding: "20px",
    background: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #e9ecef",
  },
};

export default Orders; 