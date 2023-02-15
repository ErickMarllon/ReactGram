const express = require("express");
const router = express.Router();

// Importing the controllers for photo-related logic
const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
} = require("../controllers/PhotoController");

// Importing the middlewares for photo related logic
const {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation,
} = require("../middlewares/PhotoValidation");

// Check authentication
const authGuard = require("../middlewares/authGuard");

// Handle any validation errors
const validate = require("../middlewares/handleValidation");

// Upload the image
const { imageUpload } = require("../middlewares/imageUpload");

// Define routes for the /photo 
// Insert a photo
router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidation(),
  validate,
  insertPhoto
);

// Delete a photo
router.delete("/:id", authGuard, deletePhoto);

// Get all the photos
router.get("/", authGuard, getAllPhotos);

// Get photo for a user
router.get("/user/:id", authGuard, getUserPhotos);

// Get a photo by id
router.get("/:id", authGuard, getPhotoById);

// Update a photo
router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto);

// Like a photo
router.put("/like/:id", authGuard, likePhoto);

// Comment on a photo
router.put(
  "/comment/:id",
  authGuard,
  commentValidation(),
  validate,
  commentPhoto
);

module.exports = router;
