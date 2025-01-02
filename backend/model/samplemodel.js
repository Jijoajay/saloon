const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Saloontestschema = new Schema({
    saloontest: {
        type: String,
      }
});

const Saloontest = mongoose.model('saloontest', Saloontestschema);
module.exports = Saloontest;
