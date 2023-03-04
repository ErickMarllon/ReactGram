import "./Search.css";

// hooks
import { useQuery } from "../../hooks/useQuery";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


// components

import Loading from "../../components/Loading/Loading";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import LikeComponents from "../../components/LikeComponents/LikeComponents";
import { Link } from "react-router-dom";

// Redux
import { searchPhotos } from "../../slices/photoSlice";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  // Load all photos
  useEffect(() => {
    dispatch(searchPhotos(search));
  }, [dispatch, search]);

  if (loading) {
    return <Loading/>;
  }

  return (
    <div id="search">
      {photos.length === 0 ? (
        <h2>Nenhum resultado encontrado para: {search}</h2>
      ) : (
        <h2>Você está buscando por: {search}</h2>
      )}
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeComponents photo={photo} user={user} />
            <Link className="btn" to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Search;
