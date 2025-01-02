const express = require ('express');
const router = express.Router();
const samplemodel = require("../model/samplemodel");
require("../db/connect");
const cors = require('cors')
router.use(cors());
// const jwt = require('jsonwebtoken');




//GET Method -----------------

router.get("/",async (req, res) => {
    try {
      const data = await dashData.find();
      res.status(200).send(data);
    } catch (error) {
      res.status(404).send("No data found");
    }
  });


  module.exports = router;