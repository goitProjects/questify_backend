const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./db/mongodb");
const swaggerDoc = require("./utils/swaggerDoc");
const routes = require("./routes/routes");
const rateLimit = require("express-rate-limit");
const app = express();

// Passport Config
require("./utils/passport")(passport);

// Get url to server MongoDB
const dbUrl = require("./config/config").MondoDB.url;

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message:
    "Too many accounts created from this IP, please try again after an hour" // limit each IP to 100 requests per windowMs
});

//  apply to all requests
// Connect to MongoDB
connectDB(mongoose, { dbUrl });
// Logger - see connection in/out
app.use(morgan("dev"));
app.use(limiter);
// Express json parse
app.use(express.json());
// Express body parser
app.use(express.urlencoded({ extended: true }));
// Express session
app.use(
  session({
    secret: "secret cat",
    resave: false,
    saveUninitialized: true
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

app.use("*", cors("*"));

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

swaggerDoc(app);

app.use("/", express.static("questify_frontend"));
app.use("/dashboard", express.static("questify_frontend"));

// Connecting All API Routes
app.use("/api", routes);

// Get PORT for Express App
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
