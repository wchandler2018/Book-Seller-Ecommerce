exports.userSignupValidator = (req, res, next) => {
  req.check("name", "Name is required").notEmpty();
  req
    .check("email", "Email must be atleast 6 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("A valid email must contain the @ symbol")
    .isLength({
      min: 4,
      max: 255
    });
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({
      min: 6
    })
    .withMessage("Password must contain atleast 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain at least one number.");

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({
      error: firstError
    });
  }
  next();
};
