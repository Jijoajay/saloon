const mongoose = require("mongoose");
const selectstylishmenschema = new mongoose.Schema({
    heading:String,
    experience:String,
      experienceimage:{
        data: Buffer,
        contentType: String,
      },
    review:String
    ,reviewimage:{
      data: Buffer,
      contentType: String,
    },
    logo:{
        data: Buffer,
        contentType: String,
      },
    gender:String,
});
selectstylishmenmodel = mongoose.model("selectstylishmen", selectstylishmenschema);
module.exports = selectstylishmenmodel;
