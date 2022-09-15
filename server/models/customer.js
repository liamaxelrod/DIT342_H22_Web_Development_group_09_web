var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    customerId: {type: String, require: true, unqiue: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true, unique: true },

});

module.exports = mongoose.model("customers", customerSchema);
