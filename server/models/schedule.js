var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//will be altered depending on the front is structured
var scheduleSchema = new Schema({
    idScheduling: 0,
    monday: Object,
    tuesday: Object,
    wednesday: Object,
    thursday: Object,
    friday: Object,
    saturday: Object,
    sunday: Object
});

module.exports = mongoose.model('schedules', scheduleSchema);
