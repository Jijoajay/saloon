const mongoose = require("mongoose");

const saloonformenSchemea = new mongoose.Schema({
heading:String,
status:String,
closingtime:String,
reviews:String,
gender:String,
locationdetails:String,
});
SaloonformenModelDataeonly = mongoose.model("saloonformendata", saloonformenSchemea);
module.exports = SaloonformenModelDataeonly;
