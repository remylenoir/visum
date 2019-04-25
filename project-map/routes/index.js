const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  if (req.isAuthenticated()) {
    const { profileImgPath, username, mapLayer } = req.user;
    res.render("index", { isAuthenticated: true, profileImgPath, username, mapLayer });
  } else {
    res.render("index");
  }
});

module.exports = router;
