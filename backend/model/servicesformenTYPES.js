const mongoose = require("mongoose");

const serivcesformenTYPESSchemea = new mongoose.Schema({
types:String,
saloonnameID:String,
});
Serivcesformentypes = mongoose.model("serivcesformendatas", serivcesformenTYPESSchemea);
module.exports = Serivcesformentypes;
