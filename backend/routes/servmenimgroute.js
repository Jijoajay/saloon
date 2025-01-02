const express = require ('express');
const router = express.Router();
const Servicesformenimages =  require("../model/servicesformenIMAGES");
const Serivcesformentypes =  require("../model/servicesformenTYPES")
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
    { name: 'logo', maxCount: 1 }
  ]), (req, res) => {
  const logoFile = req.files['logo'][0];
    const newserimganddatas =  Servicesformenimages({   
    logo: {
        data: fs.readFileSync("uploads/" + logoFile.filename),
        contentType: "image/png",
      }
    ,heading:req.body.heading,
    duration:req.body.duration,
    style:req.body.style,
    isadded:req.body.isadded,
    timevalue:req.body.timevalue,
    timeunit:req.body.timeunit,
    amount:req.body.amount,
    currency:req.body.currency,
}
      );
      newserimganddatas.save()
      .then((res) => {
      })
      .catch((err) => {
        console.log(err, "error has occur");
      });
      res.json({response:newserimganddatas});
  });


  router.post('/data',async (req,res)=>{
    // console.log("requestdotbody",req.body)
    const newservicedata =  await Serivcesformentypes({
      
      types:req.body.types
    });
    newservicedata.save().then((res)=>{
        console.log(res,"image is saved pro max")
      }).catch((err) => {
        console.log(err, "error has occur");
      })
      res.json({newservicedata:newservicedata})
  })


  router.get('/images',async (req,res)=>{
    console.log(req.query) ;

    const allData = await Servicesformenimages.find()
    console.log(allData,"alldata")
    res.json({saloonformen:allData,requestquery:req.query.IDpassedfromsaloon})
  })

  router.get('/data',async (req,res)=>{
    const allData = await Serivcesformentypes.find()
    console.log(allData,"alldata")
    res.json({saloonformen:allData,requestquery:req.query.IDpassedfromsaloon})
  })


  module.exports = router;