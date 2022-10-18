var express = require('express');
var router = express.Router();
var Schedule = require('../models/schedule');

//get schedule //in use // postman test working
router.get('/api/schedules', function (req, res, next) {
    Schedule.find(function(err, schedules) {
        if (err) { return next(err); }
        res.json({'schedules': schedules });
    });
});

//in use // postman test working
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

// //in use // postman test working
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

//in use // postman test working
router.put('/api/schedules/:id', (req, res, next) => {
    Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            if (result === null) {
                res.status(404).send({ message: "The Schedule not found." });
                return;
            }
            res.json(result);
        }).catch((err) => {
            res.status(502).send();
            return next(err);
        });
});
////////////////////////////////////////////////////////////////////////////
//delete a schedule // not connected to front end needed for class
router.delete('/api/schedules/:id', function(req, res, next) {
    var id = req.params.id;
    Schedule.findOneAndDelete({_id: id}, function(err, schedule) {
        if (err) { return next(err); }
        if (schedule === null) {
            return res.status(404).json({'message': 'schedule not found'});
        }
        res.json(schedule);
    });
});

//delete all schedule // not connected to front end needed or class
router.delete('/api/schedules', function(req, res, next) {
    Schedule.deleteMany(function(err, schedule) {
        if (err) { return next(err); }
        if (schedule === null) {
            return res.status(404).json({'message': 'schedule not found'});
        }
        res.json(schedule);
    });
});

module.exports = router;