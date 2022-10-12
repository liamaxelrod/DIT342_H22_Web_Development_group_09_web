var express = require('express');
var router = express.Router();
var Schedule = require('../models/schedule');


//create schedule
router.post('/api/schedules', function(req, res, next){
    var schedule = new Schedule(req.body);  // gets only what's in the object
    schedule.cells = req.body               // gets the entire object
    console.log('click')
    schedule.save(function(err, schedule) {
        if (err) { return next(err); }
        res.status(201).json(schedule);
    })
});

//get schedule
router.get('/api/schedules', function (req, res, next) {
    Schedule.find(function(err, schedules) {
        if (err) { return next(err); }
        res.json({'schedules': schedules });
    });
});

// TA
// Schedule.find().then((result) => {
//         if(result === null) 
//         {
//              res.status(404).send('sth');
//         }
//     res.json(result);
//     }
//     ).catch((err) => {
//         res.status(404).send();
//     return next(err);})
//     })//g

router.get('/api/schedules/:id', function(req, res, next) {
    var id = req.params.id;
    Schedule.findById(id, function(err, schedules) {
        if (err) { return next(err); }
        if (schedules === null) {
            return res.status(404).json({'message': 'Camel not found!'});
        }
        res.json(schedules);
    });
});

//Patchin existing schedule with new parameters
router.patch('/api/schedules/:id', function(req, res, next) {
    var id = req.params.id;
    Schedule.findById(id, function(err, schedule) {
        if (err) { return next(err); }
        if (schedule == null) {
            return res.status(404).json(
{"message": "schedule not found"});
        }
        schedule.monday.cellsRo.state = (req.body.monday.cellsRo.state || schedule.monday.cellsRo.state);
        console.log(schedule.monday.cellsRo.state + "aaa")
        // schedule.position = (req.body.position || schedule.position);
        schedule.save();
        res.json(schedule);
    });
});

//delete schedule
router.delete('/api/schedules/:id', function(req, res, next) {
    console.log('1')
    var id = req.params.id;
    Schedule.findOneAndDelete({_id: id}, function(err, schedule) {
        if (err) { return next(err); }
        if (schedule === null) {
            return res.status(404).json({'message': 'schedule not found'});
        }
        res.json(schedule);
    });
});


module.exports = router;

//if the first commmand is not work try the second then the first command
//npm run dev
//npm install