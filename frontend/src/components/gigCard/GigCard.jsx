import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => res.data),
  });

  return (
    <>
      <style>
        {`
          .gigCard {
            width: 324px;
            height: 400px;
            border: 1px solid rgb(228, 228, 228);
            margin-bottom: 40px;
            border-radius: 8px;
            overflow: hidden;
            transition: transform 0.3s ease;
          }

          .gigCard:hover {
            transform: scale(1.05);
          }

          .gigCard img {
            width: 100%;
            height: 50%;
            object-fit: cover;
          }

          .info {
            padding: 10px 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .user {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .user img {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            object-fit: cover;
          }

          .info p {
            color: #111;
            font-size: 14px;
            line-height: 1.4;
          }

          .star {
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .star img {
            height: 14px;
            width: 14px;
          }

          .star span {
            font-size: 14px;
            font-weight: bold;
            color: #ffc108;
          }

          .detail {
            padding: 10px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .detail img {
            width: 16px;
            height: 16px;
            cursor: pointer;
            object-fit: cover;
          }

          .price span {
            color: #999;
            font-size: 12px;
          }

          .price h2 {
            color: #555;
            font-size: 18px;
            font-weight: 400;
            text-align: end;
          }

          .price sup {
            font-size: 12px;
            font-weight: 300;
          }

          .link {
            text-decoration: none;
            color: inherit;
          }
        `}
      </style>

      <Link to={`/gig/${item._id}`} className="link">
        <div className="gigCard">
          <img src={item.cover} alt="" />
          <div className="info">
            {isLoading ? (
              "Loading..."
            ) : error ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img src={data.img || "/img/noavatar.jpg"} alt="" />
                <span>{data.username}</span>
              </div>
            )}
            <p>{item.desc}</p>
            <div className="star">
              <img src="./img/star.png" alt="" />
              <span>
                {!isNaN(item.totalStars / item.starNumber) &&
                  Math.round(item.totalStars / item.starNumber)}
              </span>
            </div>
          </div>
          <hr />
          <div className="detail">
            <img src="./img/heart.png" alt="" />
            <div className="price">
              <span>STARTING AT $ <b>{item.price}</b></span>
              <h2>$ {item.price ? item.price : 100}</h2>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default GigCard;
