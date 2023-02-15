const express = require("express");
const router = express.Router();

// Importing the controllers for search related logic
const { searchPhotos, searchUser } = require("../controllers/SearchController");

// Importing check authentication
const authGuard = require("../middlewares/authGuard");

// Define routes for the /photo endpoint

// add routes for /photo
router.get("/photo", authGuard, searchPhotos);

// add routes for /user
router.get("/user", authGuard, searchUser);

module.exports = router;
