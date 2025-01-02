const mongoose = require("mongoose");
const selectedbuttonsdetailsschemea = new mongoose.Schema({
    IDoftheitem:{type:String},
    date:{
        type: mongoose.Schema.Types.Mixed,
        required: true  
    },
    selectedbuttons:{
        type: mongoose.Schema.Types.Mixed,
        required: true   
    }
});
const userdetailsschema = new mongoose.Schema({
    email:{
        type: String,
        required: true  
    },
    gender:{
        type: String,
        required: true  
    },
    name: {
        type: String,
        required: true  
    },
    phonenumber:{
        type: Number,
        required: true  
    }
});

const confirmAppiontmentSchemea = new mongoose.Schema({
    dateofappointment:{
        type: mongoose.Schema.Types.Mixed,
        required: true  
    }, 
    numberofitems:{
        type: Number,
        required: true   
    },
    salonname:{
        type: String,
        required: true
    },
    selectedbuttonsdetails:selectedbuttonsdetailsschemea,
    selectedservice:{
        type: mongoose.Schema.Types.Mixed,
        required: true   
    },
    stylishname:{
        type: String,
        required: true
    },  
    timeofappointment:{
        type: mongoose.Schema.Types.Mixed,
        required: true   
    },   
    timevalue:{
        type: Number,
        required: true 
    },
    totalamount:{
        type: Number,
        required: true   
    },
    totaltime:{
        type: Number,
        required: true   
    },  
    userdetails:userdetailsschema
});
Selectedbutton = mongoose.model("confirmAppiontment", confirmAppiontmentSchemea);
module.exports = Selectedbutton;