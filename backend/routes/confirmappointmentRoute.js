const express = require ('express');
const router = express.Router();
const confirmappointment = require("../model/confirmappointment");
require("../db/connect");
const cors = require('cors')
router.use(cors());
const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../model/secret");
const  Selectedbutton  = require("../model/selectedbutton");

var jwt = require('jsonwebtoken');


router.get("/",async (req, res) => {

    try {
      const alldata = await confirmappointment.find();
      res.status(200).json({alldata:alldata});
    } catch (error) {
      res.status(404).json({error:error});
    }
    
  });

  
  router.post('/', async (req, res, next) => {
console.log("REquest.body",req.body)
    if ((req.body.selectedbuttonsdetails) === null){
      const token = createSecretToken(req.body.userdetails.email,req.body.userdetails.phonenumber);
        res.cookie("token", token, {
          withCredentials: true,
          httpOnly: false,
        })
        res.status(201).json({ message:"Return only the token",token:token,isappointmentadded:false})
    }
    else{
      try { 
        const newAppointment = confirmappointment({
        dateofappointment: req.body.dateofappointment, 
        numberofitems:req.body.numberofitems,
        salonname:req.body.salonname,
        selectedbuttonsdetails:{
          IDoftheitem:req.body.selectedbuttonsdetails.IDoftheitem,
          date:req.body.selectedbuttonsdetails.date,
          selectedbuttons:req.body.selectedbuttonsdetails.selectedbuttons
        },
        selectedservice:req.body.selectedservice,
        stylishname:req.body.stylishname,  
        timeofappointment:req.body.timeofappointment,   
        timevalue:req.body.timevalue,
        totalamount:req.body.totalamount,
        totaltime:req.body.totaltime,  
        userdetails:{
          email:req.body.userdetails.email,
          gender:req.body.userdetails.gender,
          name:req.body.userdetails.name,
          phonenumber:req.body.userdetails.phonenumber
      } 
        })
        await newAppointment.save();    
          const token = createSecretToken(req.body.userdetails.email,req.body.userdetails.phonenumber);
        res.cookie("token", token, {
          withCredentials: true,
          httpOnly: false,
        });
        // console.log("newAppointment",newAppointment)
         res.status(201).json({ message:"I think it worked",token:token,newAppointment:newAppointment,isappointmentadded:true})
        } 
      catch (error) {
        console.error(error);
      }
    }
 });



 router.post('/delete', async (req, res, next) => {
  try {
    
    const toDelete = await Selectedbutton.findOne({  
       date:   req.body.date
    });
    // console.log('request.body',req.body)
    // console.log("toDelete",toDelete.selectedbuttons);
    const y=req.body.selectedbuttons;
    const x =toDelete.selectedbuttons;
    const filteritemtosav = x.filter(item => !y.includes(item));
    // console.log("FILTERED ITEM TO SAVE",filteritemtosav)
    // console.log("toDelete",toDelete);


    // DELETE SELECTED BUTTON
    const updatedDocument = await Selectedbutton.findByIdAndUpdate(
      toDelete._id,
      {
        $set: {
          selectedbuttons: filteritemtosav
        }
      },
      { new: true }
    );


    //DELETE CONFIRM APPOINTMENTS
    const findappointmentstodelete = await  confirmappointment.find({_id:req.body.idtobedeleted});
    console.log("findappointmentstodelete",findappointmentstodelete);
    const deletedDocument = await confirmappointment.findByIdAndDelete(req.body.idtobedeleted);
    if (deletedDocument) {
      console.log('Document deleted successfully:', deletedDocument);
      } else {
       console.log('No document found with the given ID:', req.body.idtobedeleted);
       }





    // console.log("UPDATED DOCUment brO",updatedDocument)

    // const toDeleteSelectedbutton = await Selectedbutton.find(
    //   {
    //  email: req.body.email,
    //   phonenumber: parseInt(req.body.phonenumber) ,
    //   date:req.body.date , 
    //   _id:req.body.idtobedeleted
    // }
    // );
    // console.log("toDeleteSelectedbutton" ,toDeleteSelectedbutton)
    // if (!toDelete) {
    //   // Handle case where no document matches the deletion criteria
    //   return res.status(404).json({ message: "Document not found for deletion" });
    // }

    // const result = await confirmappointment.deleteOne({ _id: toDelete._id });

    // if (result.deletedCount === 1) {
    //   return res.status(200).json({ message: "Document deleted successfully" });
    // } else {
    //   return res.status(500).json({ message: "Failed to delete document" });
    // }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" ,toDelete:toDelete});
  }
});

 
 router.post('/verifytoken', async (req, res, next) => {
  try { 
    const  { token} =  req.body
    // console.log(" req.body", req.body)

    const decodedtoken =  jwt.decode(token);
   
    const email = decodedtoken.email;
    const phonenumber = decodedtoken.phonenumber;                                    
    const specificuserdata = await confirmappointment.find({'userdetails.email': email,'userdetails.phonenumber': phonenumber});
    // console.log(" userdata",specificuserdata)
    let tempindexstore=[]; 
    specificuserdata.map((itemuser,indexuser)=>{
      // console.log(indexuser,":::::::    \n ", itemuser)
      tempindexstore.push(indexuser)

    })
        console.log(" tempindexstore",tempindexstore)

    res.status(201).json({ message:"I think it worked",userdata:specificuserdata});
    
    } 
  catch (error) {
    console.error(error);
  }
});

  module.exports = router;