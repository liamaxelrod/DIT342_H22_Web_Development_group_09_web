var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var camelSchema = new Schema({
    id: { type: Number },
    color: { type: String },
    position: { type: Number }
});

module.exports = mongoose.model('camels', camelSchema);
