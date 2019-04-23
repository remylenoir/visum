const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// GET requests
router.get("/map", (req, res, next) => {
  res.render("basic-map");
});

router.get("/api", (req, res, next) => {
  if (req.isAuthenticated()) {
    const userId = req.user._id;
    User.find({ _id: userId })
      .then(data => res.json(data))
      .catch(err => {
        console.error(err);
      });
  }
});

router.get("/api/user", (req, res, next) => {
  res.json(req.user);
});

// POST requests
router.post("/api", (req, res, next) => {
  if (req.isAuthenticated()) {
    const { activeLayers } = req.body;
    User.findOneAndUpdate({ _id: req.user._id }, { mapLayer: activeLayers })
      .then(data => res.json(data))
      .catch(err => {
        console.error(err);
      });
  }
});

module.exports = router;
