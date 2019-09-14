const express = require("express");
const router = express.Router();

const {
  create,
  categoryById,
  read,
  update,
  list,
  remove
} = require("../controllers/category");
const { isAdmin, requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

// @route   GET category/create/:userId
// @desc    Get a specific category route
// @access  Public
router.get("/category/:categoryId", read);

// @route   POST category/create/:userId
// @desc    Create category route
// @access  Private
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);

// @route   PUT category/:category/:userId
// @desc    Update category route
// @access  Private
router.put(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);

// @route   DELETE category/:category/:userId
// @desc    Delete category route
// @access  Private
router.delete(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

// @route   GET /categories
// @desc    Get all categories route
// @access  Public
router.get("/categories", list);

router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;
