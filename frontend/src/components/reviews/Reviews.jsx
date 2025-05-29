import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (review) => newRequest.post("/reviews", review),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "loading"
        : error
        ? "Something went wrong!"
        : data.map((review) => <Review key={review._id} review={review} />)}
      <div className="add">
        <h3>Add a review</h3>
        <form className="addForm" onSubmit={handleSubmit}>
          <input type="text" placeholder="Write your opinion" />
          <select>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <button>Send</button>
        </form>
      </div>

      {/* Inline Styles */}
      <style>{`
        .reviews {
          margin-top: 50px;
        }

        .add {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .addForm {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .addForm input {
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .addForm select {
          width: 200px;
          padding: 10px;
          align-self: flex-end;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .addForm button {
          align-self: flex-end;
          width: 100px;
          border: none;
          padding: 10px;
          color: white;
          background-color: #1dbf73;
          cursor: pointer;
          border-radius: 5px;
        }

        .addForm button:hover {
          background-color: #17a865;
        }

        hr {
          height: 0;
          border: 0.5px solid lightgray;
          margin: 50px 0px;
        }
      `}</style>
    </div>
  );
};

export default Reviews;
