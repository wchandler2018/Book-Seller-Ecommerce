const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
require("dotenv").config();

// import routes
const userRoutes = require("./routes/user");

// app
const app = express();

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("DB Connected"));

// morgan middleware
app.use(morgan("dev"));

//body-parser middleware
app.use(bodyParser.json());

//cookie-parser middleware
app.use(cookieParser());

//express-validator middleware
app.use(expressValidator());

// routes middleware
app.use("/api", userRoutes);

//dev server port
const port = process.env.PORT || 8000;

//dev server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
