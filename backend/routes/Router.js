const express = require("express");
const router = express();

// Adding api prefix

// add routes for /api/users
router.use("/api/users", require("./UserRoutes"));

// add routes for /api/photos
router.use("/api/photos", require("./PhotoRoutes"));

// add routes for /api/search
router.use("/api/search", require("./SearchRoutes"));

// test router --- rota de teste

router.get("/", (req, res) => {
  res.send("API Working!");
});

module.exports = router;
