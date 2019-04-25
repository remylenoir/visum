require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");

const mongoConnectURI =
  process.env.NODE_ENV === "development" ? "mongodb://localhost/project-map" : process.env.MONGODB_URI;

mongoose
  .connect(mongoConnectURI, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(`${app_name}:${path.basename(__filename).split(".")[0]}`);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

hbs.registerHelper("ifUndefined", (value, options) => {
  if (arguments.length < 2) throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

//auth middleware
const authenticationCheck = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.render("error", { errorMessage: "This is a protected route" });
};

// default value for title local
app.locals.title = "Welcome to Visum";

// Enable authentication using session + passport
app.use(
  session({
    secret: "visualMapping",
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());
require("./passport")(app);

const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const map = require("./routes/map");
app.use("/", map);

const profile = require("./routes/profile");
app.use("/auth", profile);

module.exports = app;
