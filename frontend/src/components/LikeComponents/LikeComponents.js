import React from "react";
import "./LikeComponents.css";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { like, resetMessage, unlike } from "../../slices/photoSlice";
import { useDispatch } from "react-redux";
const LikeComponents = ({ photo, user }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    const ArrayLikes = photo.likes.filter((e) => e === user._id);

    if (ArrayLikes.length === 0) {
      dispatch(like(photo._id));
    } else {
      dispatch(unlike(photo._id));
    }
    resetMessage();
  };

  return (
    <div className="like">
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ? (
            <BsHeartFill onClick={() => handleLike(photo)} />
          ) : (
            <BsHeart onClick={() => handleLike(photo)} />
          )}
          <p>{photo.likes.length} like(s)</p>

        </>
      )}
    </div>
  );
};

export default LikeComponents;
