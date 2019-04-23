const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

router.get("/profile", (req, res, next) => {
  if (req.isAuthenticated()) {
    User.findOne({ _id: req.user._id }).then(user => {
      res.render("auth/profile", { user, isAuthenticated: true });
      console.log(user);
    });
  }
});

module.exports = router;
