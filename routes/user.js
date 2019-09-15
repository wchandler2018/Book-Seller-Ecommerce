const express = require("express");
const router = express.Router();
const { userById, read, update } = require("../controllers/user");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");

// @route   GET /products/photo/:productId
// @desc    Get Product photo route
// @access  Public
router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile
  });
});

// @route   GET /user/:userId
// @desc    Get user profile route
// @access  Private

router.get("/user/:userId", requireSignin, isAuth, read);

// @route   PUT /user/:userId
// @desc    Update user profile route
// @access  Private

router.put("/user/:userId", requireSignin, isAuth, update);

router.param("userId", userById);

module.exports = router;
