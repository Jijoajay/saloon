const express = require ('express');
const router = express.Router();
const SaloonformenModelImageonly = require("../model/saloonformenImageSchema");
const SaloonformenModelDataeonly = require("../model/saloonformenDATASchema");

const cors = require('cors')
router.use(cors());
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

const upload = multer({ storage: storage });
  router.post("/images", upload.fields([
    
    { name: 'logo', maxCount: 1 },
    { name: 'stars', maxCount: 1 },
    { name: 'genderimage', maxCount: 1 },
    { name: 'locationimage', maxCount: 1 }
    
  ]), (req, res) => {
    const logoFile = req.files['logo'][0];
    const starsFile = req.files['stars'][0];
    const genderImageFile = req.files['genderimage'][0];
    const locationImageFile = req.files['locationimage'][0];
    

     const newsaloon =  SaloonformenModelImageonly({
      
    logo: {
        data: fs.readFileSync("uploads/" + logoFile.filename),
        contentType: "image/png",
      },
      stars:{
        data: fs.readFileSync("uploads/" + starsFile.filename),
        contentType: "image/png",
      },
       genderimage:{
      data: fs.readFileSync("uploads/" + genderImageFile.filename),
        contentType: "image/png",
      },
      locationimage:{
        data: fs.readFileSync("uploads/" + locationImageFile.filename),
        contentType: "image/png",
      },
      heading:req.body.heading,
      status:req.body.status,
      closingtime:req.body.closingtime,
      openingtime:req.body.openingtime,
      reviews:req.body.reviews,
      gender:req.body.gender,
      locationdetails:req.body.locationdetails,
      GENDER: req.body.GENDER,
      LOCATION: req.body.LOCATION,
      RATINGS: req.body.RATINGS,
      HOURS: req.body.HOURS,
      latitude :  req.body.latitude,
      longitude :  req.body.longitude,
    });
    newsaloon.save()
      .then((res) => {
        console.log("image is saved");
      })
      .catch((err) => {
        console.log(err, "error has occur");
      });
      res.json({response:newsaloon});
  });
 
   
   router.post('/data',async (req,res)=>{
    const newsaloondata = SaloonformenModelDataeonly({heading:req.body.heading,status:req.body.status,closingtime:req.body.closingtime,
      reviews:req.body.reviews,gender:req.body.gender,locationdetails:req.body.locationdetails});

      newsaloondata.save().then((res)=>{
        console.log(res,"image is saved pro max")
      }).catch((err) => {
        console.log(err, "error has occur");
      })
      res.json({newsaloondata:newsaloondata})
  })








  router.get('/data',async (req,res)=>{
    const allData = await SaloonformenModelDataeonly.find()
    res.json({saloonformen:allData})
  })

  router.get('/images',async (req,res)=>{
    const allData = await SaloonformenModelImageonly.find()
    console.log(allData,"alldata")
    res.json({saloonformen:allData})
  })

  module.exports = router;