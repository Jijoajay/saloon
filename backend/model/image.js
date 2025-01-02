const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  mimetype: { type: String, required: true },
});
ImageModel = mongoose.model("image", imgSchema);
module.exports = ImageModel;


