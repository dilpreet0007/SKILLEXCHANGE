import React, { useEffect, useRef, useState } from "react";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", sort],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        min: minRef.current?.value || "",
        max: maxRef.current?.value || "",
        sort: sort,
      });

      const response = await newRequest.get(`/gigs?${queryParams.toString()}`);
      return response.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  return (
    <div style={styles.gigs}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Explore</h1>
        <p style={styles.description}>
          Explore the boundaries of skills with SKILLEXCHANGE.
        </p>

        {/* Filter & Sort Menu */}
        <div style={styles.menu}>
          <div style={styles.left}>
            <span style={styles.label}>Budget</span>
            <input ref={minRef} type="number" placeholder="Min" style={styles.input} />
            <input ref={maxRef} type="number" placeholder="Max" style={styles.input} />
            <button onClick={apply} style={styles.button}>Apply</button>
          </div>

          <div style={styles.right}>
            <span style={styles.sortBy}>Sort by</span>
            <span style={styles.sortType}>
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="/img/down.png" alt="Sort" style={styles.icon} onClick={() => setOpen(!open)} />

            {open && (
              <div style={styles.dropdown}>
                <span onClick={() => setSort("createdAt")} style={styles.dropdownItem}>Newest</span>
                <span onClick={() => setSort("sales")} style={styles.dropdownItem}>Best Selling</span>
                <span onClick={() => setSort("popular")} style={styles.dropdownItem}>Popular</span>
              </div>
            )}
          </div>
        </div>

        {/* Gig Cards Section */}
        <div style={styles.cards}>
          {isLoading ? (
            <p style={styles.loading}>Loading...</p>
          ) : error ? (
            <p style={styles.error}>Something went wrong!</p>
          ) : data && Array.isArray(data) && data.length > 0 ? (
            data.map((gig) => <GigCard key={gig._id} item={gig} />)
          ) : (
            <p style={styles.error}>No gigs available</p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  gigs: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8f9fa",
    minHeight: "100vh",
    width: "100%",
    padding: "50px 200px",
    boxSizing: "border-box",
  },
  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
  },
  breadcrumbs: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "10px",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#222",
    marginBottom: "10px",
  },
  description: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "30px",
    textAlign: "center",
    maxWidth: "800px",
    margin: "auto",
  },
  menu: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    background: "#fff",
    padding: "15px 20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "30px",
    width: "100%",
    maxWidth: "1000px",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#444",
  },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
    width: "120px",
    textAlign: "center",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    background: "#1dbf73",
    color: "white",
    fontSize: "14px",
    fontWeight: "bold",
    borderRadius: "5px",
    cursor: "pointer",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    top: "40px",
    right: "0",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    zIndex: 10,
  },
  dropdownItem: {
    fontSize: "14px",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "4px",
    textAlign: "center",
    background: "white",
    transition: "background 0.2s",
    "&:hover": {
      background: "#f0f0f0",
    },
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    justifyContent: "center",
    width: "100%",
    maxWidth: "1200px",
    margin: "auto",
  },
  loading: {
    fontSize: "16px",
    color: "#007bff",
    textAlign: "center",
    fontWeight: "bold",
  },
  error: {
    fontSize: "16px",
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
  },
};

export default Gigs;
