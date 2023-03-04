const express = require("express");
const router = express.Router();

// Importing the controllers for user-related logic
const {
  register,
  getCurrentUser,
  login,
  update,
  getUserById,
} = require("../controllers/UserController");

// Importing the middlewares for user related logic
const {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require("../middlewares/userValidations");

// Check authentication
const authGuard = require("../middlewares/authGuard");

// Handle any validation errors
const validate = require("../middlewares/handleValidation");

// Upload the image
const { imageUpload } = require("../middlewares/imageUpload");

// Define routes for the /user

// Register a new user
router.post("/register", userCreateValidation(), validate, register);

// Log in an existing user
router.post("/login", loginValidation(), validate, login);

// Get current user
router.get("/profile", authGuard, getCurrentUser);

// Update a user
router.put(
  "/",
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single("profileImage"),
  update
);

//  Get a user by id
router.get("/:id", getUserById);

module.exports = router;
