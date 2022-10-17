var express = require('express');
var router = express.Router();
var Schedule = require('../models/schedule');


//create schedule
router.post('/api/schedules', function(req, res, next){
    var schedule = new Schedule(req.body);  // gets only what's in the object
    schedule.cells = req.body               // gets the entire object
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

// 
//Patchin existing schedule with new parameters
router.patch('/api/schedules/:id', function(req, res, next) {
    // Schedule.findByIdAndUpdate(req.params.id,  { $set: { 
    //     scheduleName: req.body.scheduleName,
    // }})
    // .then(res => res.status(200).json(res))
    // .catch(err => res.status(500).json(err));
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

router.put('/api/schedules/:id', (req, res, next) => {
    console.log(req.body)
    Schedule.findByIdAndUpdate(req.params.id, req.body)
    .then(res => res.status(200).json(res))
    .catch(err => res.status(500).json(err));
});

//delete schedule
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

module.exports = router;

        //Assume that schedule has two properties height and weight (cuz I don't remember what the actual properties of schedule are). 
    //You should pass the scheduleId from the frontend.
    // Schedule.findById(req.params.id)
    //     .then((result) => {
    //         if (result === null) {
    //             res.status(404).send({ message: "The ScheduleId not found." });
    //             return;
    //         }
    //         console.log('start result ' + result.cells.monday.cellsRo[0].cellState)
    //         console.log(req.body.monday.cellsRo[0].cellState)
    //         // if (body.weight) {   //here, it checks which property has been passed to the backend through body
    //         //     result.weight = [...body.weight, ...result.weight];  //this part is a js syntax which helps to avoid typing all the other properties
    //         // }
    //         // if (body.height) {
    //         //     result.height = [...body.heihgt, ...result.height];
    //         // }
    //         result.cells.monday = (req.body.monday || result.cells.monday)
    //         console.log('end result ' + result.cells.monday.cellsRo[0].cellState)
    //         result.save();
    //         res.json(result);

    //     }).catch((err) => {
    //         res.status(502).send({ message: "Not found" });
    //         return next(err);
    //     });



    //
    //
    // var id = req.params.id;
    // Schedule.findById(id, function(err, schedule) {
    //     if (err) { return next(err); }
    //     if (schedule == null) {
    //         return res.status(404).json(
    //         {"message": "schedule not found"});
    //     }
    //     console.log(req.body.monday)
    //
    //
    ///     console.log(schedule.cells.monday)
    //     // schedule.scheduleName = (req.body.scheduleName || schedule.scheduleName);
    //     schedule.cells.monday = (req.body.monday || schedule.cells.monday);
    //     // schedule.position = (req.body.position || schedule.position);
    //     // console.log(schedule)
    //     console.log(schedule.cells.monday)
    //     schedule.save();
    //     res.json(schedule);
    // });
    //