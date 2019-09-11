const User = require("../models/User");
const { errorHandler } = require("../helpers/dbErrorHandler");
const jwt = require("jsonwebtoken"); //to generate a signed token
const expressJwt = require("express-jwt"); //to check authorization

//signup controller
exports.signup = (req, res) => {
  console.log("req.body", req.body);
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error)
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;

    res.json({
      user
    });
  });
};

//signin controller
exports.signin = (req, res) => {
  //find the user by their email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "This email does not exist please register for a new account"
      });
    }
    // if user is found make sure the email and password match
    // create authentticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password dont match, please check again."
      });
    }
    // generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    //persist the token as "t" in cookie with expiration date
    res.cookie("t", token, { expire: new Date() + 9999 });
    //return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

//signout controller
exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "You have been signed out successfully!" });
};
