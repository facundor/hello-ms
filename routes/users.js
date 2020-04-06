const express = require("express");
const router = express.Router();
const User = require("../model/User");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  let user = { name: "Charles", surname: "Darwin" };
  res.status(200).json(user);
});

/* POST user. */
router.post("/", function (req, res, next) {
  const user = User({
    name: req.body.name,
    surname: req.body.surname,
  });

  user
    .save()
    .then((data) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log("error: " + err);
      res.json({ message: err });
    });
});

module.exports = router;
