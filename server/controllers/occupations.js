var express = require('express');
var router = express.Router();
var Occupation = require('../models/occupation');

router.post('/api/occupations', function(req, res, next){
    console.log(req.body)
    var occupation = new Occupation(req.body);
    occupation.save(function(err, occupation) {
        if (err) { return next(err); }
        res.status(201).json(occupation);
    })
});

router.get('/api/occupations', function(req, res, next) {
    Occupation.find(function(err, occupation) {
        if (err) { return next(err); }
        res.json({'occupation': occupation });
    });
});

router.get('/api/occupations/:id', function(req, res, next) {
    var id = req.params.id;
    Occupation.findById(id, function(err, occupation) {
        if (err) { return next(err); }
        if (occupation === null) {
            return res.status(404).json({'message': 'occupation not found!'});
        }
        res.json(occupation);
    });
});

router.delete('/api/occupations', function(req, res, next) {
    Occupation.deleteMany(function(err, occupation) {
        if (err) { return next(err); }
        if (occupation === null) {
            return res.status(404).json({'message': 'occupation not found'});
        }
        res.json(occupation);
    });
});

module.exports = router;