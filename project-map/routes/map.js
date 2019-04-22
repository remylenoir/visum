const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

//authentication func
const authenticationCheck = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.render("error", { errorMessage: "This is a protected route" });
};

router.get("/map", authenticationCheck, (req, res, next) => {
  const userId = req.user._id;
  const userActive = req.user.mapLayer;
  User.find({ _id: userId }).then(user => {
    res.render("basic-map", { user });
  });
});

module.exports = router;
