const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

router.get("/map", (req, res, next) => {
  if (req.isAuthenticated()) {
    const userId = req.user._id;
    const userActive = req.user.mapLayer;
    User.find({ _id: userId }).then(user => {
      res.render("basic-map", { user });
    });
  }
  res.render("basic-map");
});

module.exports = router;
