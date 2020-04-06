const express = require("express");
const router = express.Router();
const User = require("../model/User");

/* GET users listing. */
router.get("/", async (req, res) => {

  try{
    const users = await User.find();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (err) {
    console.log("error get:" + err)
    res.status(500).json({ message: err });
  }
  
});

/* POST user. */
router.post("/", async (req, res) => {
  const user = User({
    name: req.body.name,
    surname: req.body.surname,
  });

  try{
      const userSaved = await user.save();
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(userSaved);
    } catch(err){
      console.log("error post: " + err);
      res.status(500).json({ message: err });
    }
});

module.exports = router;
