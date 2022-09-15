var express = require('express');
var router = express.Router();
var Camel = require('../models/camel');

router.post('/api/camels', function(req, res, next){
    var camel = new Camel(req.body);
    camel.save(function(err, camel) {
        if (err) { return next(err); }
        res.status(201).json(camel);
    })
});

router.get('/api/camels', function(req, res, next) {
    Camel.find(function(err, camels) {
        if (err) { return next(err); }
        res.json({'camels': camels });
    });
});

router.get('/api/camels/:id', function(req, res, next) {
    var id = req.params.id;
    Camel.findById(id, function(err, camel) {
        if (err) { return next(err); }
        if (camel === null) {
            return res.status(404).json({'message': 'Camel not found!'});
        }
        res.json(camel);
    });
});

router.delete('/api/camels/:id', function(req, res, next) {
    var id = req.params.id;
    Camel.findOneAndDelete({_id: id}, function(err, camel) {
        if (err) { return next(err); }
        if (camel === null) {
            return res.status(404).json({'message': 'Camel not found'});
        }
        res.json(camel);
    });
});

module.exports = router;
