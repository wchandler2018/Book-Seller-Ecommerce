const express = require("express");
const router = express.Router();

const {
  create,
  productById,
  read,
  remove,
  update
} = require("../controllers/product");
const { isAdmin, requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

// @route   POST product/create/:userId
// @desc    Create product route
// @access  Private
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);

// @route   GET product/:productId
// @desc    Get a single product route
// @access  Private
router.get("/product/:productId", read);

// @route   DELETE product/:productId/:userId
// @desc    Delete a single product route
// @access  Private
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

// @route   PUT product/:productId/:userId
// @desc    Update a single product route
// @access  Private
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
