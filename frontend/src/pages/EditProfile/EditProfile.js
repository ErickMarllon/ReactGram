import React from "react";
import "./EditProfile.css";

import { uploads } from "../../utils/config";
// Icons
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, updateProfile } from "../../slices/userSlice";

// Components
import Message from "../../components/Message/Message";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import Loading from "../../components/Loading/Loading";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user, message, error, loading } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const resetMessage = useResetComponentMessage(dispatch);
  // Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // fill user form
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gather user data from states
    const userData = {
      name,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      userData.password = password;
    }

    // build form data
    const formData = new FormData();

    const userFormData = Object.keys(userData).forEach((key) =>
      formData.append(key, userData[key])
    );

    formData.append("user", userFormData);

    await dispatch(updateProfile(formData));

    resetMessage();
  };

  const toggleShowPassword = () => setShow(!show);

  const handleFile = (e) => {
    // image preview
    const image = e.target.files[0];

    setPreviewImage(image);

    // change image state
    setProfileImage(image);
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div id="editProfile">
      <h2>Edite seus dados.</h2>
      <p className="subtitle">
        Adicione uma imagem de perfil e conte mais sobre voc??...
      </p>
      {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${user.profileImage}`
          }
          alt={user.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Nome"
          placeholder="Nome"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={email || ""}
          disabled
        />
        <label>
          <span>Imagem de perfil:</span>
          <input type="file" onChange={handleFile} />
        </label>
        <label>
          <span>Bio:</span>
          <input
            type="text"
            name="Bio"
            placeholder="Descri????o do perfil."
            value={bio || ""}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <div className="password">
            <input
              type={show ? "text" : "password"}
              placeholder="Digite sua nova senha."
              autoComplete="off"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="showPassword" onClick={toggleShowPassword}>
              {show ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
            </span>
          </div>
        </label>
        {!loading && <input type="submit" value="Atualizar" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default EditProfile;
