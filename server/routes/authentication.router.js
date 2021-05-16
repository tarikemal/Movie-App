const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const User = require("./../models/user.model.js");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      res.send({
        status: false,
        message: "Böyle bir email adresi kayıtlı değil.",
      });
    } else {
      if (user.password === password) {
        const token = jwt.sign({ userId: user._id }, "secret");
        res.send({
          status: true,
          token: token,
        });
      } else {
        res.send({
          status: false,
          massage: "Hatalı şifre girdiniz.",
        });
      }
    }
  });
});

router.post("/signup", (req, res) => {
  const { email, password } = req.body;

  const newUser = new User({
    email: email,
    password: password,
  });

  newUser.save().then((data) => {
    try {
      res.send({ status: true, user: data });
    } catch (err) {
      res.send({
        status: false,
        message: "err",
      });
    }
  });
});

module.exports = router;
