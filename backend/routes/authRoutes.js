const express = require("express");

const {
  googleLogin,
  getCurrentUser,
  logout,
} = require("../controllers/googleController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/google", googleLogin);

router.post("/logout", logout);

router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;
