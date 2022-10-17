var express = require('express');
var router = express.Router();
var Schedule = require('../models/schedule');


// //create schedule // delete if not used
// router.post('/api/schedules', function(req, res, next){
//     var schedule = new Schedule(req.body);  // gets only what's in the object
//     schedule.cells = req.body               // gets the entire object
//     schedule.save(function(err, schedule) {
//         if (err) { return next(err); }
//         res.status(201).json(schedule);
//     })
// });

//get schedule //in use
router.get('/api/schedules', function (req, res, next) {
    Schedule.find(function(err, schedules) {
        if (err) { return next(err); }
        res.json({'schedules': schedules });
    });
});

//in use
router.get('/api/schedules/:id', function(req, res, next) {
    var id = req.params.id;
    Schedule.findById(id, function(err, schedules) {
        if (err) { return next(err); }
        if (schedules === null) {
            return res.status(404).json({'message': 'schedules not found!'});
        }
        res.json(schedules);
    });
});

// //in use
//Patchin existing schedule with new parameters
router.patch('/api/schedules/:id', function(req, res, next) {
    Schedule.findByIdAndUpdate(req.params.id, { $set: {
            scheduleName: req.body.scheduleName,
        },
        // cells: req.body
    }, {new: true}, function(err, schedules) {
        if (err) { return next(err); }
        if (schedules === null) {
            return res.status(404).json({'message': 'schedules not found!'});
        }
        res.json(schedules);
    });
});

//in use
router.put('/api/schedules/:id', (req, res, next) => {
    console.log(req.body)
    Schedule.findByIdAndUpdate(req.params.id, req.body)
    .then(res => res.status(200).json(res))
    .catch(err => res.status(500).json(err));
});

// //delete schedule // delete if not used
// router.delete('/api/schedules/:id', function(req, res, next) {
//     var id = req.params.id;
//     Schedule.findOneAndDelete({_id: id}, function(err, schedule) {
//         if (err) { return next(err); }
//         if (schedule === null) {
//             return res.status(404).json({'message': 'schedule not found'});
//         }
//         res.json(schedule);
//     });
// });

module.exports = router;