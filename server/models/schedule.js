var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//will be altered depending on the front is structured
var scheduleSchema = new Schema({
    month: { type: Number },
    day: { type: Number },
    availability: { type: Boolean }
});

module.exports = mongoose.model('schedules', scheduleSchema);
