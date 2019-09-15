const express = require("express");
const router = express.Router();

const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo
} = require("../controllers/product");
const { isAdmin, requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

// @route   POST /product/create/:userId
// @desc    Create product route
// @access  Private
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);

// @route   GET /product/:productId
// @desc    Get a single product route
// @access  Private
router.get("/product/:productId", read);

// @route   DELETE /product/:productId/:userId
// @desc    Delete a single product route
// @access  Private
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

// @route   PUT /product/:productId/:userId
// @desc    Update a single product route
// @access  Private
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);

// @route   GET products
// @desc    Get all products route
// @access  Public
router.get("/products", list);

// @route   GET /product/related/:productId/
// @desc    Get related products route
// @access  Public
router.get("/products/related/:productId", listRelated);

// @route   GET /products/categories
// @desc    List all categories route
// @access  Public
router.get("/products/categories", listCategories);

// @route   POST /products/by/search
// @desc    Product Search route
// @access  Public
router.post("/products/by/search", listBySearch);

// @route   GET /products/photo/:productId
// @desc    Get Product photo route
// @access  Public
router.get("/product/photo/:productId", photo);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
