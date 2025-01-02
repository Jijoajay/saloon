const mongoose = require("mongoose");

const saloonformenimagaesSchemea = new mongoose.Schema({
 
  logo: {
    data: Buffer,
    contentType: String,
  },
  stars:{
    data: Buffer,
    contentType: String,
  },
  genderimage:{
    data: Buffer,
    contentType: String,
  },
  gender:String,
  locationimage:{
    data: Buffer,
    contentType: String,
  },
    heading:String,
    status:String,
    closingtime:String,
    reviews:String,
    locationdetails:String,
    GENDER: String,
    LOCATION: String,
    RATINGS: String,
    HOURS: String,
    latitude : String,
    longitude : String,
    openingtime:String
  });
SaloonformenModelImageonly = mongoose.model("saloonformenimages", saloonformenimagaesSchemea);
module.exports = SaloonformenModelImageonly;
