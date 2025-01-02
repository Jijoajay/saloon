
const express = require ('express');
const router = express.Router();

const cors = require('cors')
router.use(cors());
const User = require("../model/testmodel");
const Selectedbutton = require("../model/selectedbutton");

const { createSecretToken } = require("../model/secret");
const bcrypt = require("bcryptjs");


router.post('/data', async (req, res, next) => {
  try {
    const {  phonenumber,email } = req.body;
    const existingUser = await Selectedbutton.findOne({ email,phonenumber });
    if (existingUser) {
      // const user = await User.create({ email, password, username, createdAt });
      const token = createSecretToken(email,phonenumber);
      console.log("token",token);

      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      return res.json({ message: "User already exists" });
    }

    const token = createSecretToken(email,phonenumber);
      // res.cookie("token", token, {
      //   withCredentials: true,
      //   httpOnly: false,
      // });

    res
      .status(201)
      .json({ message: "cooked with data", success: true,token:token });
    next();
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;