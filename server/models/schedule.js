var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//will be altered depending on the front is structured
var scheduleSchema = new Schema({
    cells: {
        monday: {
          cellsRo: Array.from({ length: 23 }, (_, i) => ({
            state: 0,
            id: i,
            string: '',
            day: 1
          }))
        },
        tuesday: {
          cellsRo: Array.from({ length: 23 }, (_, i) => ({
            state: 0,
            id: i,
            string: '',
            day: 2
          }))
        },
        wednesday: {
          cellsRo: Array.from({ length: 23 }, (_, i) => ({
            state: 0,
            id: i,
            string: '',
            day: 3
          }))
        },
        thursday: {
          cellsRo: Array.from({ length: 23 }, (_, i) => ({
            state: 0,
            id: i,
            string: '',
            day: 4
          }))
        },
        friday: {
          cellsRo: Array.from({ length: 23 }, (_, i) => ({
            state: 0,
            id: i,
            string: '',
            day: 5
          }))
        },
        saturday: {
          cellsRo: Array.from({ length: 23 }, (_, i) => ({
            state: 0,
            id: i,
            string: '',
            day: 6
          }))
        },
        sunday: {
          cellsRo: Array.from({ length: 23 }, (_, i) => ({
            state: 0,
            id: i,
            string: '',
            day: 7
          }))
        }
      }
});

module.exports = mongoose.model('schedules', scheduleSchema);
