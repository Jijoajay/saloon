const mongoose = require("mongoose");
const selectedservicesformenschema = new mongoose.Schema({
selecteditems:String,

});
Servicesformenimages = mongoose.model("servicesformenimages", selectedservicesformenschema);
module.exports = Servicesformenimages;
