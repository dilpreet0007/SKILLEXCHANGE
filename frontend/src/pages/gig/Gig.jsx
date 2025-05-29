import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";

// ✅ Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function Gig() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => res.data),
    enabled: !!userId,
  });

  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              Fiverr {">"} Graphics & Design {">"}
            </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((_, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}

            {/* ✅ Swiper replaces infinite-react-carousel */}
            <Swiper
              modules={[Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              className="slider"
            >
              {data.images.map((img) => (
                <SwiperSlide key={img}>
                  <img src={img} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>

            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryDate} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${id}`}>
              <button>Continue</button>
            </Link>
          </div>
        </div>
      )}

      {/* Inline Styles (same as before) */}
      <style>{`
        .gig { display: flex; justify-content: center; padding: 40px 0; background-color: #f9f9f9; }
        .container { width: 1400px; padding: 30px; display: flex; gap: 50px; background: #fff; border-radius: 10px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); }
        .left { flex: 2; display: flex; flex-direction: column; gap: 25px; }
        .breadcrumbs { font-weight: 400; text-transform: uppercase; font-size: 13px; color: #888; }
        h1 { font-size: 24px; font-weight: bold; color: #333; }
        .user { display: flex; align-items: center; gap: 15px; padding: 15px; background: #f5f5f5; border-radius: 8px; }
        .pp { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 2px solid #ddd; }
        .user span { font-size: 16px; font-weight: 600; color: #444; }
        .stars { display: flex; align-items: center; gap: 5px; }
        .stars img { height: 16px; width: 16px; }
        .stars span { font-size: 14px; font-weight: bold; color: #ffc108; }
        .slider { background-color: #f3f3f3; border-radius: 10px; padding: 10px; }
        .slider img { max-height: 500px; object-fit: contain; border-radius: 10px; width: 100%; }
        h2 { font-size: 22px; font-weight: 600; color: #222; }
        p { font-size: 16px; font-weight: 400; line-height: 1.6; color: #555; }
        .right { flex: 1; border: 1px solid lightgray; padding: 20px; border-radius: 10px; display: flex; flex-direction: column; gap: 20px; height: max-content; max-height: 500px; position: sticky; top: 150px; background: #fff; box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08); }
        .price { display: flex; align-items: center; justify-content: space-between; }
        .price h2 { font-weight: 400; font-size: 24px; }
        .price h3 { font-weight: 500; font-size: 18px; color: #555; }
        .details { display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding: 10px 0; border-bottom: 1px solid #ddd; }
        .details .item { display: flex; align-items: center; gap: 10px; }
        .details img { width: 22px; }
        .features { margin-top: 10px; }
        .features .item { display: flex; align-items: center; gap: 10px; font-weight: 400; color: #555; margin-bottom: 8px; }
        .features img { width: 18px; }
        button { background-color: #1dbf73; padding: 12px; color: white; font-weight: 600; border: none; font-size: 18px; cursor: pointer; border-radius: 6px; transition: 0.3s ease-in-out; }
        button:hover { background-color: #18a35f; transform: scale(1.05); }
      `}</style>
    </div>
  );
}

export default Gig;
