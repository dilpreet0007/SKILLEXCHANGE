import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { jsPDF } from "jspdf";
import getCurrentUser from "../../utils/getCurrentUser";

function Pay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: sellerData,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${data?.userId}`).then((res) => res.data),
    enabled: !!data?.userId,
  });

  const generateAgreementPDF = () => {
    if (!data || !sellerData || !currentUser) return;

    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text("Service Agreement", 105, 20, { align: "center" });
    
    // Add service details
    doc.setFontSize(12);
    doc.text(`Service: ${data.title}`, 20, 40);
    doc.text(`Price: $${data.price}`, 20, 50);
    doc.text(`Delivery Time: ${data.deliveryTime} days`, 20, 60);
    
    // Add parties involved
    doc.text("Parties Involved:", 20, 80);
    doc.text(`Seller: ${sellerData.username}`, 30, 90);
    doc.text(`Buyer: ${currentUser.username}`, 30, 100);
    
    // Add agreement terms
    doc.text("Agreement Terms:", 20, 120);
    doc.setFontSize(10);
    doc.text("1. The seller agrees to deliver the service as described.", 30, 130);
    doc.text("2. The buyer agrees to pay the specified amount.", 30, 140);
    doc.text("3. Both parties agree to maintain professional conduct.", 30, 150);
    doc.text("4. The seller will complete the work within the specified timeframe.", 30, 160);
    doc.text("5. The buyer will provide necessary information and feedback.", 30, 170);
    
    // Add signatures
    doc.setFontSize(12);
    doc.text("Signatures:", 20, 190);
    doc.text(`Seller: ${sellerData.username}`, 30, 200);
    doc.text(`Buyer: ${currentUser.username}`, 30, 210);
    
    // Add date
    const today = new Date().toLocaleDateString();
    doc.text(`Date: ${today}`, 20, 230);
    
    // Save the PDF
    doc.save("service-agreement.pdf");
  };

  const handlePayment = async () => {
    try {
      generateAgreementPDF();
      
      const orderData = {
        gigId: id,
        img: data.cover,
        title: data.title,
        price: data.price,
        sellerId: data.userId,
        buyerId: currentUser._id,
        payment_intent: "temporary_payment_intent",
      };

      await newRequest.post("/orders", orderData);
      navigate("/purchases");
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  if (isLoading || isLoadingUser) return "Loading...";
  if (error || errorUser) return "Something went wrong!";

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h1 style={styles.title}>Complete Your Purchase</h1>
        
        <div style={styles.details}>
          <h2 style={styles.subtitle}>Service Details</h2>
          <p style={styles.text}>Title: {data.title}</p>
          <p style={styles.text}>Price: ${data.price}</p>
          <p style={styles.text}>Delivery Time: {data.deliveryTime} days</p>
          <p style={styles.text}>Seller: {sellerData.username}</p>
        </div>

        <div style={styles.agreement}>
          <h2 style={styles.subtitle}>Agreement</h2>
          <p style={styles.text}>
            By clicking the "Pay Now" button, you agree to the terms and conditions
            of this service. A PDF agreement will be generated for your records.
          </p>
        </div>

        <button onClick={handlePayment} style={styles.button}>
          Pay Now
        </button>
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
    maxWidth: "600px",
    width: "100%",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "30px",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#444",
    marginBottom: "15px",
  },
  details: {
    marginBottom: "30px",
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "8px",
  },
  agreement: {
    marginBottom: "30px",
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "8px",
  },
  text: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "10px",
    lineHeight: "1.5",
  },
  button: {
    width: "100%",
    padding: "15px",
    background: "#1dbf73",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default Pay; 