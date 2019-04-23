const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("index", { isAuthenticated: true });
  } else {
    res.render("index");
  }
});

module.exports = router;
