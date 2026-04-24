const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const { register, login, getMe } = require("../controllers/authController");
const requireAuth = require("../middlewares/authMiddleware");
const validateRequest = require("../middlewares/validateRequest");

router.post(
   "/register",
   [
      body("email").isEmail().withMessage("Please include a valid email"),
      body("password")
         .isLength({ min: 6 })
         .withMessage("Password must be at least 6 characters long"),
   ],
   validateRequest,
   register,
);

router.post(
   "/login",
   [
      body("email").isEmail().withMessage("Please include a valid email"),
      body("password").exists().withMessage("Password is required"),
   ],
   validateRequest,
   login,
);

router.get("/me", requireAuth, getMe);

module.exports = router;
