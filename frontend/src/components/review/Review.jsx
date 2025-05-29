import { useQuery } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";

const Review = ({ review }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => res.data),
  });

  return (
    <div className="review">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="user">
          <img className="pp" src={data.img || "/img/noavatar.jpg"} alt="" />
          <div className="info">
            <span>{data.username}</span>
            <div className="country">
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}
      <div className="stars">
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <img src="/img/star.png" alt="" key={i} />
          ))}
        <span>{review.star}</span>
      </div>
      <p>{review.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>

      {/* Inline Styles */}
      <style>{`
        .review {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 20px;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          background-color: #f9f9f9;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .user {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .pp {
          height: 50px;
          width: 50px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ddd;
        }

        .info span {
          font-size: 16px;
          font-weight: bold;
        }

        .country {
          display: flex;
          align-items: center;
          gap: 10px;
          color: gray;
        }

        .stars {
          display: flex;
          gap: 5px;
        }

        .stars img {
          height: 14px;
          width: 14px;
        }

        .stars span {
          font-size: 14px;
          font-weight: bold;
          color: #ffc108;
        }

        .helpful {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .helpful img {
          width: 14px;
        }
      `}</style>
    </div>
  );
};

export default Review;
