var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quoteOfTheDaySchema = new Schema({
    goesWithUserID: '',
    stringQuoteOfTheDay: ''
});

module.exports = mongoose.model('quoteOfTheDays', quoteOfTheDaySchema);