const express = require ('express');
const router = express.Router();
const cors = require('cors')
const selectedbutton = require("../model/selectedbutton");
router.use(cors());



// router.post('/data', async (req, res, next) => {
//   try { 
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     const {IDoftheitem,date, selectedbuttons,email,phonenumber} = req.body;
//     console.log(" req.body", req.body)

//       const phonenumberparseint =   parseInt(phonenumber)
//     const QUeried = await selectedbutton.find({IDoftheitem,date,email,phonenumberparseint});
//     // console.log("QUeried",QUeried);
//     if(QUeried.length ===0){
//       console.log("QUeried.length ===0",QUeried)
//       const newselectedbuttondata = selectedbutton({
//         IDoftheitem:IDoftheitem,date:date, 
//         selectedbuttons:selectedbuttons,
//         phonenumber: phonenumberparseint,
//         email: email
//       })
//       newselectedbuttondata.save()
//       res.status(201).json({ message: "Successfully saved data",newselectedbuttondata: newselectedbuttondata});
//     }
//     else{
//       const QUeriedbuttons = QUeried[0].selectedbuttons;
//       // console.log("QUeriedbuttons",QUeriedbuttons)
//       const x = [...QUeriedbuttons,...selectedbuttons] 
//      const QUeriedbuttontobeadded=   x.filter((item,
//           index) => x.indexOf(item) === index);
//           // console.log("QUeriedbuttons",QUeriedbuttons)   
//           // console.log("x",x)
//           // console.log("QUeriedbuttontobeadded",QUeriedbuttontobeadded);
//         if(QUeried.length>0){
//         console.log("QUeried.length",QUeried.length)   
//         const updatedDocument = await selectedbutton.findOneAndUpdate(
//           { IDoftheitem, date,   phonenumberparseint,
//            email },
//           { selectedbuttons:QUeriedbuttontobeadded},      
//           { new: true });
//         updatedDocument.save();
//         console.log("updatedDocumentsdfsd",updatedDocument)
//         res.status(201).json({updatedDocumentsdfsd:updatedDocument});
//       }
//       else{
//         const newselectedbuttondata = selectedbutton({
//           IDoftheitem:IDoftheitem,
//           date:date, 
//           selectedbuttons:selectedbuttons,
//           phonenumber: phonenumberparseint,
//           email: email
//         });
        
//         newselectedbuttondata.save();
//         res.status(201).json({ message: "Successfully saved data",
//         newselectedbuttondata: newselectedbuttondata
//       });
//       }
          
//     }
//     next();
//   } catch (error) {
//     console.error(error);
//   }
// });

router.post('/data', async (req, res, next) => {
  try { 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    const {IDoftheitem,date, selectedbuttons,email,phonenumber} = req.body;
    console.log(" req.body", req.body)
        // console.log("request dot body",req.body);
    const QUeried = await selectedbutton.find({IDoftheitem,date});
    // console.log("QUeried",QUeried);
    if(QUeried.length ===0){
      console.log("QUeried.length ===0")
      const newselectedbuttondata = selectedbutton({
        IDoftheitem:IDoftheitem,date:date, selectedbuttons:selectedbuttons
      })
      newselectedbuttondata.save()
      res.status(201).json({ message: "Successfully saved data",newselectedbuttondata: newselectedbuttondata});
    }
    else{
      const QUeriedbuttons = QUeried[0].selectedbuttons;
      // console.log("QUeriedbuttons",QUeriedbuttons)
      const x = [...QUeriedbuttons,...selectedbuttons] 
     const QUeriedbuttontobeadded=   x.filter((item,
          index) => x.indexOf(item) === index);
          console.log("QUeriedbuttons",QUeriedbuttons)   
          console.log("x",x)
          console.log("QUeriedbuttontobeadded",QUeriedbuttontobeadded)
  
       if(QUeried.length>0){
        console.log("QUeried.length",QUeried.length)
        
        const updatedDocument = await selectedbutton.findOneAndUpdate(
          { IDoftheitem, date },
          { selectedbuttons:QUeriedbuttontobeadded},
          { new: true }  );
        updatedDocument.save();
        console.log("updatedDocument",updatedDocument)

        res.status(201).json({updatedDocument:updatedDocument});
      }
      else{
        const newselectedbuttondata = selectedbutton({
          IDoftheitem:IDoftheitem,date:date, selectedbuttons:selectedbuttons
        })
        newselectedbuttondata.save();
        res.status(201).json({ message: "Successfully saved data",
        newselectedbuttondata: newselectedbuttondata
      });
      }
          
    }
    next();
  } catch (error) {
    console.error(error);
  }
});

router.get('/data', async (req, res, next) => {
    const allData = await selectedbutton.find()
    res.json({selectedbuttons:allData})
  });

 router.post('/data/alreadybooked', async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    try { 
      const {IDoftheitem,date, selectedbuttons} = req.body;
      const QUeried = await selectedbutton.find({IDoftheitem,date})
      console.log('QUeried',QUeried)
      res.json({QUeried:QUeried})
      } 

       catch (error) {
      console.error(error);
    }




  });

router.post('/data/date', async (req, res, next) => {
    try { 
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);

      const {IDoftheitem,date, selectedbuttons} = req.body;
      const allData = await selectedbutton.find({IDoftheitem,date,selectedbuttons})
       res.status(201).json({ message:"Successfully saved data", allData: allData})
      } 

       catch (error) {
      console.error(error);
    }
 });
  
  
router.options('/selectedbuttons/data', cors());
module.exports = router;