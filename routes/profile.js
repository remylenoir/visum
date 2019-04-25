const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

router.get("/profile", (req, res, next) => {
  if (req.isAuthenticated()) {
    const { profileImgPath, username, mapLayer } = req.user;
    res.render("auth/profile", { profileImgPath, username, mapLayer, isAuthenticated: true });
  } else {
    res.status(404);
    res.render("not-found");
  }
});

module.exports = router;
