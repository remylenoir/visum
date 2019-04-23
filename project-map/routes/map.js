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
  } else res.render("basic-map");
});

router.post("/api", (req, res, next) => {
  const { userId, activeLayers } = req.body;
  console.log(userId, activeLayers);

  User.findOneAndUpdate({ _id: userId }, { mapLayer: activeLayers })
    .then(() => console.log("done"))
    .catch(err => {
      console.error(err);
    });
});

router.get("/api", (req, res, next) => {
  User.find().then(data => res.json(data));
});

module.exports = router;
