var express = require('express');
var router = express.Router();
var Task = require('../models/task');

router.post('/api/tasks', function(req, res, next){
    var task = new Task(req.body);
    task.save(function(err, task) {
        if (err) { return next(err); }
        res.status(201).json(task);
    })
});

router.get('/api/tasks', function(req, res, next) {
    Task.find(function(err, tasks) {
        if (err) { return next(err); }
        res.json({'tasks': tasks });
    });
});

router.get('/api/tasks/:id', function(req, res, next) {
    var id = req.params.id;
    Task.findById(id, function(err, task) {
        if (err) { return next(err); }
        if (task === null) {
            return res.status(404).json({'message': 'Task not found!'});
        }
        res.json(task);
    });
});

router.delete('/api/tasks/:id', function(req, res, next) {
    var id = req.params.id;
    Task.findOneAndDelete({_id: id}, function(err, task) {
        if (err) { return next(err); }
        if (task === null) {
            return res.status(404).json({'message': 'Task not found'});
        }
        res.json(task);
    });
});

module.exports = router;