var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//will be altered depending on the front is structured
var scheduleSchema = new Schema({
    monday: Object
});

module.exports = mongoose.model('schedules', scheduleSchema);
