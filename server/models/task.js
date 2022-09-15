var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    color: { type: String },
    id: { type: Number }
});

module.exports = mongoose.model('tasks', taskSchema);