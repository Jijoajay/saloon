const mongoose = require("mongoose");
const otpschema = new mongoose.Schema({
    otp: { type: Number, required: true },
    email: { type: String, required: true,unique:true },
    phonenumber:{type: Number,required: true,unique:true}
});

otpModel = mongoose.model("otp", otpschema);
module.exports = otpModel;