const express = require("express");

const {
  googleLogin,
  getCurrentUser,
} = require("../controllers/googleController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/google", googleLogin);

router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;