var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    name: { type: String},
    email: { type: String, require: true, unique: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true, unique: true },
});

module.exports = mongoose.model("customers", customerSchema);
