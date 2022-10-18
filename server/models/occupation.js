var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var occupationSchema = new Schema({
    goesWithUserID: '',
    stringOccupation: ''
});

module.exports = mongoose.model('occupations', occupationSchema);