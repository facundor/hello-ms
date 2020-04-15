const express = require("express");
const router = express.Router();
const User = require("../model/User");
const fetch = require("node-fetch");

const verifyCatpcha = async (req, res, next) => {
  const secret_key = process.env.CAPTCHA_SECRET_KEY;
  const token = req.headers["g-recaptcha-response"];
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

  console.log("captcha full url: " + url);

  req.captcha = await fetch(url, {
    method: "post",
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

  console.log("google catpcha score: " + req.captcha.score);

  if (req.captcha.score > 0.5) {
    next();
  } else {
    res.status(403).json({message:"not authorized"});
  }
};

// GET users listing.
router.get("/", verifyCatpcha, async (req, res) => {
  try {
    const users = await User.find();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (err) {
    console.log("error get:" + err);
    res.status(500).json({ message: err });
  }
});

// Get by ID
router.get("/:id", async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (err) {
    console.log("error get:" + err);
    res.status(500).json({ message: err });
  }
});

// ADD user
router.post("/", async (req, res) => {
  const user = User({
    name: req.body.name,
    surname: req.body.surname,
  });

  try {
    const userSaved = await user.save();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(userSaved);
  } catch (err) {
    console.log("error post: " + err);
    res.status(500).json({ message: err });
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  try {
    const userRemoved = await User.remove({ _id: req.params.id });
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(userRemoved);
  } catch (err) {
    console.log("error post: " + err);
    res.status(500).json({ message: err });
  }
});

// DELETE user
router.patch("/:id", async (req, res) => {
  try {
    const userUpdated = await User.updateOne(
      { _id: req.params.id },
      { $set: { name: req.body.name, surname: req.body.surname } }
    );
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(userUpdated);
  } catch (err) {
    console.log("error post: " + err);
    res.status(500).json({ message: err });
  }
});

module.exports = router;
