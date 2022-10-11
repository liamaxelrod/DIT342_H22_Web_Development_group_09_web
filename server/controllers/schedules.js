var express = require('express');
var router = express.Router();
var Schedule = require('../models/schedule');

//create schedule
router.post('/api/schedules', function(req, res, next){
    var schedule = new Schedule(req.body);
    schedule.save(function(err, schedule) {
        if (err) { return next(err); }
        res.status(201).json(schedule);
    })
});

//get schedule
router.get('/api/schedules', function(req, res, next) {
    Schedule.find(function(err, schedules) {
        if (err) { return next(err); }
        res.json({'schedules': schedules });
    });
});

//get this it schedule
router.get('/api/schedules/:id', function(req, res, next) {
    var id = req.params.id;
    Schedule.findById(id, function(err, schedule) {
        if (err) { return next(err); }
        if (schedule === null) {
            return res.status(404).json({'message': 'schedule not found!'});
        }
        res.json(schedule);
    });
});

//put a new schedule in an old one
router.put('/api/schedules/:id', function(req, res, next) {
    var id = req.params.id;
    Schedule.findById(id, function(err, schedule) {
        if (err) { return next(err); }
        if (schedule == null) {
            return res.status(404).json({"message": "schedule not found"});
        }
        schedule.color = req.body.color;
        schedule.position = req.body.position;
        schedule.save();
        res.json(schedule);
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
        schedule.color = (req.body.color || schedule.color);
        schedule.position = (req.body.position || schedule.position);
        schedule.save();
        res.json(schedule);
    });
});

//delete schedule
/*
router.delete('/api/schedules/:name', function(req, res, next) {
    var id = req.params.id;
    Schedule.findOneAndDelete({_id: id}, function(err, schedule) {
        if (err) { return next(err); }
        if (schedule === null) {
            return res.status(404).json({'message': 'schedule not found'});
        }
        res.json(schedule);
    });
});
*/

module.exports = router;

//if the first commmand is not work try the second then the first command
//npm run dev
//npm install