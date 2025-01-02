const mongoose = require("mongoose");
const myAppiontmentSchemea = new mongoose.Schema({
  alldetails:{
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
});
MyAppiontment = mongoose.model("myAppiontment", myAppiontmentSchemea);
module.exports = MyAppiontment;