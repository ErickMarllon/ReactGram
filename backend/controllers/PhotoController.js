const { check } = require("express-validator");
const mongoose = require("mongoose");
const Photo = require("../models/Photo");
const User = require("../models/User");
// inser a photo, with an user related to it
const insertPhoto = async (req, res) => {
  // Extract title from the request
  const { title } = req.body;

  // Extract file name of the image
  const image = req.file.filename;

  // Fetch the user who made the request
  const reqUser = req.user;
  const user = await User.findById(reqUser._id);

  // Create a photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  // Check if photo was created successfully
  if (!newPhoto) {
    // If not, return error response
    res.status(422).json({
      errors: ["Houve um problema, por favor tente novamente mais tarde."],
    });
    return;
  }

  // If success, return the created photo
  res.status(201).json(newPhoto);
};

// Remove a photo from the database
const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  try {
    // Fetch the photo to be deleted
    const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    // Check if photo exists
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }
    // Check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      res.status(401).json({
        errors: ["Ocorreu um erro, por favor tente novamente mais tarde."],
      });

      return;
    }

    // Delete the photo
    await Photo.findByIdAndDelete(photo._id);

    // Return success message
    res
      .status(200)
      .json({ id: photo._id, message: "Foto excluída com sucesso." });
    return;
  } catch (error) {
    // Return error response if something went wrong
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }
};
// Get all photos
const getAllPhotos = async (req, res) => {
  // Fetch all photos sorted in descending order of creation date
  const photos = await Photo.find({})
    .sort([["createAt", -1]])
    .exec();
  // Return the photos
  return res.status(200).json(photos);
};
// get user photos
const getUserPhotos = async (req, res) => {
  const { id } = req.params;
  const photos = await Photo.find({ userId: id })
    .sort([["createAt", -1]])
    .exec();
  return res.status(200).json(photos);
};

// Get photo by id
const getPhotoById = async (req, res) => {
  const { id } = req.params;
    // Fetch the photo with the provided id
  const photo = await Photo.findById(mongoose.Types.ObjectId(id));

  // check photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }
  // Return the photo
  return res.status(200).json(photo);
};
// update a photo
const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const reqUser = req.user;
  const photo = await Photo.findById(id);

  // check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }
  // check if belongd to user
  if (!photo.userId.equals(reqUser._id)) {
    res.status(422).json({
      errors: ["Ocorreu um erro, por favor tente novamente mais tarde."],
    });
    return;
  }
  if (title) {
    // update photo title
    photo.title = title;
  }
   // save photo
  await photo.save();
  res.status(200).json({ photo, message: "Foto atualizada com sucesso!" });
};


// like and dislike functionality
const likePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;
  const photo = await Photo.findById(id);

  // check if photo exists
  if (!photo) {
    return res.status(404).json({ errors: ["Foto não encontrada!"] });
  }
  // Check if the user has previously liked the photo
  const isLiked = photo.likes.includes(reqUser._id);
  // Add or remove the user's ID from the photo's likes list
  photo.likes = isLiked
    ? photo.likes.filter((userId) => userId !== reqUser._id)
    : [...photo.likes, reqUser._id];
  await photo.save();

  // Return a success response with the photo ID, user ID, and a message
  return res.status(200).json({
    photoId: id,
    userId: reqUser._id,
    message: isLiked ? "A foto foi descurtida." : "A foto foi curtida.",
  });
};

const commentPhoto = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const reqUser = req.user;
  const user = await User.findById(reqUser._id);
  const photo = await Photo.findById(id);
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }
  // Put comment in the array comments
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
  };
  // insert comment in photo
  photo.comments.push(userComment);

  await photo.save();

  res.status(200).json({
    comment: userComment,
    message: "O comentário foi adicionado com sucesso!",
  });
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
};
