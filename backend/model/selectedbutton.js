const mongoose = require("mongoose");
const selectedbuttonsSchemea = new mongoose.Schema({
IDoftheitem :{
    type: String,
},

date: {
    type: mongoose.Schema.Types.Mixed,
    required: true
},
selectedbuttons:{
    type: mongoose.Schema.Types.Mixed,
    required: true
},
email:{
    type: String,
},
phonenumber:{
    type:Number
}
});
Selectedbutton = mongoose.model("selectedbutton", selectedbuttonsSchemea);
module.exports = Selectedbutton;