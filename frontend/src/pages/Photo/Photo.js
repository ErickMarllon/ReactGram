import "./Photo.css";
import { uploads } from "../../utils/config";
//Components
import Message from "../../components/Message/Message";
import Loading from "../../components/Loading/Loading";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import LikeComponents from "../../components/LikeComponents/LikeComponents";

//Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

//Redux
import { comment, getPhoto } from "../../slices/photoSlice";

const Photo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);
  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );
  const [commentText, setCommentText] = useState();
  // Comentários

  //Loading a photo
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);
  if (loading) {
    return <Loading />;
  }

  // const handleLike = () => {
  //   const ArrayLikes = photo.likes.filter((e) => e === user._id);

  //   if (ArrayLikes.length === 0) {
  //     dispatch(like(photo._id));
  //   } else {
  //     dispatch(unlike(photo._id));
  //   }
  //   resetMessage();
  // };

  // Insert a comment
  const handleComment = (e) => {
    e.preventDefault();

    const commentData = {
      comment: commentText,
      id: photo._id,
    };

    dispatch(comment(commentData));

    setCommentText("");

    resetMessage();
    console.log(comment);
  };

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeComponents photo={photo} user={user} />
      <div className="message-container">
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </div>
      <div className="comments">
        {photo.comments && (
          <>
            <h3>Comentários ({photo.comments.length}):</h3>
            <form onSubmit={handleComment}>
              <input
                type="text"
                placeholder="Insira seu comentário..."
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText || ""}
              />
              <input type="submit" value="Enviar" />
            </form>
            {photo.comments.length === 0 && <p>Não há comentários...</p>}
            {photo.comments.map((comment, idx) => (
              <div className="comment" key={idx}>
                <div className="author">
                  {comment.userImage && (
                    <img
                      src={`${uploads}/users/${comment.userImage}`}
                      alt={comment.userName}
                    />
                  )}
                  <Link to={`/users/${comment.userId}`}>
                    <p>{comment.userName}</p>
                  </Link>
                </div>
                <p>{comment.comment}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Photo;
