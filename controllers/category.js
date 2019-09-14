const Category = require("../models/Category");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: "This Category does not exist"
      });
    }
    res.json({ data });
  });
};

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((error, category) => {
    if (error || !category) {
      return res.status(400).json({
        error: "Category does not exist"
      });
    }
    req.category = category;
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.category);
};

exports.update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error)
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const category = req.category;
  category.remove((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error)
      });
    }
    res.json({
      message: "Category has been deleted"
    });
  });
};

exports.list = (req, res) => {
  Category.find().exec((error, data) => {
    if (error) {
      res.status(400).json({
        error: errorHandler(error)
      });
    }
    res.json(data);
  });
};
