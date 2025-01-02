const express = require ('express');
const router = express.Router();
const cors = require('cors')

const selectstylishmenmodel =  require("../model/selectstylishmen");

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
    { name: 'reviewimage', maxCount: 1 },
    { name: 'experienceimage', maxCount: 1 }
  ]), (req, res) => {

    const logoFile = req.files['logo'][0];
    const reviewimageFile = req.files['reviewimage'][0];
    const experienceimage = req.files['experienceimage'][0];
    
    const newserimganddatas =  selectstylishmenmodel({   
    logo: {
        data: fs.readFileSync("uploads/" + logoFile.filename),
        contentType: "image/png",
      },
      reviewimage: {
        data: fs.readFileSync("uploads/" + reviewimageFile.filename),
        contentType: "image/png",
      },
      heading:req.body.heading,
      experience:req.body.experience,
      experienceimage: {
        data: fs.readFileSync("uploads/" + experienceimage.filename),
        contentType: "image/png",
      },
      review:req.body.review,
      gender:req.body.gender,
    }
      );
      newserimganddatas.save()
      .then((res) => {
        console.log("RES",res)
        console.log("image is saved");
      })
      .catch((err) => {
        console.log(err, "error has occur");
      });
      res.json({response:newserimganddatas});
  });


  router.get('/images',async (req,res)=>{
    const allData = await selectstylishmenmodel.find()
    console.log(allData,"alldata")
    res.json({saloonformen:allData})
  })



  module.exports = router;