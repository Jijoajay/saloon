const mongoose = require("mongoose");
const servicesformenIMAGESSChema = new mongoose.Schema({
    logo:{
        data: Buffer,
        contentType: String,
      },
heading:String,
duration:String,
style:String,
isadded:String,
timevalue:Number,
timeunit:String,
amount:Number,
currency:String,
saloonnameID:String,

});
Servicesformenimages = mongoose.model("servicesformenimages", servicesformenIMAGESSChema);
module.exports = Servicesformenimages;
