var express = require('express');
var router = express.Router();
var QuoteOfTheDay = require('../models/quoteOfTheDay');

router.post('/api/quoteOfTheDays', function(req, res, next){
    console.log(req.body)
    var quoteOfTheDay = new QuoteOfTheDay(req.body);
    quoteOfTheDay.save(function(err, quoteOfTheDay) {
        if (err) { return next(err); }
        res.status(201).json(quoteOfTheDay);
    })
});

router.get('/api/quoteOfTheDays', function(req, res, next) {
    QuoteOfTheDay.find(function(err, quoteOfTheDay) {
        if (err) { return next(err); }
        res.json({'quoteOfTheDays': quoteOfTheDay });
    });
});

router.get('/api/quoteOfTheDays/:id', function(req, res, next) {
    var id = req.params.id;
    QuoteOfTheDay.findById(id, function(err, quoteOfTheDay) {
        if (err) { return next(err); }
        if (quoteOfTheDay === null) {
            return res.status(404).json({'message': 'QuoteOfTheDay not found!'});
        }
        res.json(quoteOfTheDay);
    });
});

router.delete('/api/quoteOfTheDays', function(req, res, next) {
    QuoteOfTheDay.deleteMany(function(err, quoteOfTheDay) {
        if (err) { return next(err); }
        if (quoteOfTheDay === null) {
            return res.status(404).json({'message': 'quoteOfTheDay not found'});
        }
        res.json(quoteOfTheDay);
    });
});

module.exports = router;