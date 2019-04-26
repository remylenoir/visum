const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// GET requests
router.get("/map", (req, res, next) => {
  if (req.isAuthenticated()) {
    const { profileImgPath, username } = req.user;
    res.render("basic-map", { isAuthenticated: true, profileImgPath, username });
  } else res.render("basic-map");
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

// router.get("/api/delete", (req, res, next) => {
//   if (req.isAuthenticated()) {
//     const userId = req.user._id;
//     User.find({ _id: userId })
//       .then(data => res.json(data))
//       .catch(err => {
//         console.error(err);
//       });
//   }
// });

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

router.post("/api/delete", (req, res, next) => {
  if (req.isAuthenticated()) {
    const activeLayer = req.body.activeLayer;
    console.log(activeLayer);
    const _id = req.user._id;
    User.findOneAndUpdate({ _id }, { $pull: { mapLayer: activeLayer } })
      .then(data => res.json(data))
      .catch(err => {
        console.error(err);
      });
  }
});

module.exports = router;
