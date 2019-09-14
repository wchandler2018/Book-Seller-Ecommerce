const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  signout,
  requireSignin
} = require("../controllers/auth");
const { userSignupValidator } = require("../validator");

// @route   POST api/signup
// @desc    Signup users route
// @access  Public
router.post("/signup", userSignupValidator, signup);

// @route   POST api/signin
// @desc    Signin users route
// @access  Public
router.post("/signin", signin);

// @route   GET api/signout
// @desc    Signout users route
// @access  Public
router.get("/signout", signout);

module.exports = router;
