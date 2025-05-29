import React from "react";
import { Link } from "react-router-dom";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyGigs() {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();
  
 // console.log(currentUser._id);
  //console.log(currentUser);

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => newRequest.delete(`/gigs/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["myGigs"]),
  });

  const handleDelete = (id) => mutation.mutate(id);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "100vh",
        padding: "20px",
        boxSizing: "border-box",
        color: "#555",
      }}
    >
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Error fetching gigs"
      ) : (
        <div
          style={{
            width: "100%",
            maxWidth: "100%",
            padding: "20px",
            background: "#fff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: "20px",
              padding: "0 10px",
            }}
          >
            <h1 style={{ fontSize: "22px", fontWeight: "600", margin: 0 }}>
              My Gigs
            </h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button
                  style={{
                    backgroundColor: "#1dbf73",
                    color: "white",
                    fontWeight: "500",
                    border: "none",
                    padding: "10px 15px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  Add New Gig
                </button>
              </Link>
            )}
          </div>

          {/* Table Wrapper for Full Width and Scroll on Small Screens */}
          <div
            style={{
              width: "100%",
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                minWidth: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ background: "#1dbf73", color: "white" }}>
                  <th style={{ textAlign: "left", padding: "12px" }}>Image</th>
                  <th style={{ textAlign: "left", padding: "12px" }}>Title</th>
                  <th style={{ textAlign: "left", padding: "12px" }}>Price</th>
                  <th style={{ textAlign: "left", padding: "12px" }}>Sales</th>
                  <th style={{ textAlign: "left", padding: "12px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
              
                {data.map((gig, index) => (
                  <tr
                    key={gig._id}
                    style={{
                      height: "50px",
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                    }}
                  >
                    <td style={{ padding: "12px" }}>
                      <img
                        src={gig.cover}
                        alt=""
                        style={{
                          width: "50px",
                          height: "30px",
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                      />
                    </td>
                    <td style={{ padding: "12px" }}>{gig.title}</td>
                    <td style={{ padding: "12px" }}>${gig.price}</td>
                    <td style={{ padding: "12px" }}>{gig.sales}</td>
                    <td style={{ padding: "12px" }}>
                      <img
                        src="./img/delete.png"
                        alt=""
                        style={{
                          width: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDelete(gig._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyGigs;
