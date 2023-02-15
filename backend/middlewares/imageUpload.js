// Require the multer and path modules
const multer = require("multer");
const path = require("path");

// Set up diskStorage for multer to determine where to save the file and how to name it
const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: (req, file, cb) => {
    let folder = "";
    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
    }
    cb(null, `uploads/${folder}/`);
  },

  // Rename the file - if this is a large application, use the uuid library to shorten the file name
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Sets up multer to handle image uploads by specifying the storage, fileFilter
const imageUpload = multer({

  // ImageStorage to determine where to save the file and how to name it
  storage: imageStorage,
  fileFilter(req, file, cb) {
    
    // Upload only png and jpg formats
    if (!file.originalname.match(/\.(png|jpg)$/))
      return cb(new Error("Por favor, envie apenas png ou jpg!"));
    cb(undefined, true);
  },
});

module.exports = { imageUpload };
