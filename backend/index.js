const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config()
const fs = require("fs");
const imageModel = require("./model/image");
const cors = require('cors');    
const corsOpts = {
    origin: '*',
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
};
app.use(cors(corsOpts))
require("./db/connect")
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({limit: '10mb', extended: true }))

const multer = require("multer")
// const  GridFsStorage  = require("multer-gridfs-storage")
const saloonformenRoute = require("./routes/saloonformenRoute");
app.use("/saloonsformen",saloonformenRoute)

const servmenimgroute = require("./routes/servmenimgroute");
app.use("/serviceformenimageroute",servmenimgroute);

const testroute = require("./routes/testroute");
app.use("/test",testroute);

const selectstylishmenroute = require("./routes/selectstylishmenroute");
app.use("/selectstylishmenroute",selectstylishmenroute);

const Selectedbutton = require("./routes/selectedbuttonRoute");
app.use("/selectedbuttons",Selectedbutton);

const optroute = require("./routes/optroute");
app.use("/otp",optroute);

const myappointmentsRoute = require("./routes/myappointmentsRoute");
app.use("/appointments",myappointmentsRoute);

const confirmappointmentRoute = require("./routes/confirmappointmentRoute");
app.use("/confirmappointment",confirmappointmentRoute);

const PORT = 5000

   
  // app.get('/roles on',async (req,res)=>{
   
  //   res.json({data:"roleson"})
  // })

// const url = "mongodb+srv://rolesonbookstore:tennisbat@cluster0.ndqpz8q.mongodb.net/?retryWrites=true&w=majority"


// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })
// let upload = multer({ storage: storage })

// app.use(express.static(__dirname + '/public'));
// app.use('/uploads', express.static('uploads'));

// app.post('/uploadpro', upload.single('profile-file'),  async function (req, res, next) {
//   // req.file is the `profile-file` file
//   // req.body will hold the text fields, if there were any
//   console.log(JSON.stringify(req.file))
//   // let  response = '<a href="/">Home</a><br>'
//   // response += "Files uploaded successfully.<br>"
//   // response += `<img src="${req.file.path}" /><br>`

//   // return res.send(response)
//   // Create a new instance of the File model with data extracted from req.file
//   const newFile = new imageModel({
//     filename: req.file.originalname,
//     path: req.file.path, // Assuming multer has stored the file on disk and added the path to req.file
//     mimetype: req.file.mimetype
//     // Add any other relevant file metadata here
//   });

//   // Save the new file instance to the database
//   await newFile.save();

//   return res.json({response:newFile})
// // })
// app.get("/uploadpro",async(req,res)=>{
//   try {
//     const data = await imageModel.find();
//     res.status(200).send(data);
//   } catch (error) {
//     res.status(404).send("No data found");
//   }
// })
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})

