const express = require ('express');
const router = express.Router();
const MyAppiontment = require("../model/myappointments");
require("../db/connect");
const cors = require('cors')
router.use(cors());
// const jwt = require('jsonwebtoken');
//GET Method -----------------

router.get("/",async (req, res) => {
    try {
      const data = await MyAppiontment.find();
      res.status(200).send(data);
    } catch (error) {
      res.status(404).send("No data found");
    }
  });

  router.post('/', async (req, res, next) => {
    try { 
      const {alldetails} = req.body;
      const newAppointment = MyAppiontment({
        alldetails:alldetails
      })
      newAppointment.save();
       res.status(201).json({ message:"NEW APPOITNMENT SAVED SUCCESSFULLY", newAppointment: newAppointment})
      } 
    catch (error) {
      console.error(error);
    }
 });
 
  module.exports = router;