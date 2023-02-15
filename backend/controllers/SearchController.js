const { check } = require("express-validator");

const Photo = require("../models/Photo");
const User = require("../models/User");

// search photos by title
const searchPhotos = async (req, res) => {
  // get the query string parameter
  const { q } = req.query;
  
  // search the Photos model with a case-insensitive title match
  const photos = await Photo.find({ title: new RegExp(q, "i") }).exec();
  
  // if no photos are found, return a 404 with an error message
  if (!photos.length) {
    return res.status(404).json({ errors: ["Nenhum resultado encontrado!"] });
  }
  
  // return the found photos with a 200 status
  res.status(200).json(photos);
};

// search user by name
const searchUser = async (req, res) => {
  // get the query string parameter
  const { q } = req.query;
  
  // search the User model with a case-insensitive name match
  const users = await User.find({ name: new RegExp(q, "i") }).exec();
  
  // if no users are found, return a 404 with an error message
  if (!users.length) {
    res.status(404).json({ errors: ["Nenhum resultado encontrado!"] });
    return;
  }
  
  // return the found users with a 200 status
  res.status(200).json(users);
};

// export the functions as a module
module.exports = {
  searchPhotos,
  searchUser,
};