var express = require('express');
var router = express.Router();
var Customer = require('../models/customer');

//  Creates a customer 
router.post('/api/customers', function(req, res, next){
    var customer = new Customer(req.body);
    customer.save(function(err, customer) {
        if (err) { return next(err); }
        res.status(201).json(customer);
    })
});

//  Gets all customers
router.get('/api/customers', function(req,res,next) {
    Customer.find(function(err,customers){
        if(err){return next (err); 
        }        
        if(customers === null){
        return res.status(404).json({'message': 'No registered customers. Register customers to view them'});
        }
        res.json({'customers' : customers});
    });
});

//  Gets a customer with the requested customerId

router.get('/api/customers/:customerId', function(req, res, next) {
    const customerId = req.params.customerId;
    Customer.findById(customerId, function(err, customer) {
        if (err) { return next(err); }
        if (customer === null) {
        return res.status(404).json({'message': 'Customer with specified Id cannot be found'});
        }
        res.json({'customers': customer});
    });
});

//  Deletes all the customers
router.delete('/api/customers', function(req,res,next) {
    Customer.find(function(err,customers){
        if(err){return next (err);
        }
        if(customers === null){
        return res.status(404).json({'message' : 'No registered customers. Register customers to delete them'});
        }
        res.json({'customers' : customers});

    });
});

router.delete('/api/customers/:customerId', function(req, res, next) {
    const customerId = req.params.customerId;
    Customer.findById(customerId, function(err, customer) {
        if (err) { return next(err); }
        if (customer === null) {
        return res.status(404).json({'message': 'Customer with specified Id cannot be found'});
        }
        res.json({'customers': customer});
    });
});

//  Updates Customer with customerId using PUT (updates every singe aspect)
router.put('/api/customers/:customerId', function(req,res,next) {
    const customerId = req.params.customerId
    Customer.findOneAndReplace(customerId, function(err,customer){
        if(err){return next (err);
        }
        if(customer === null){
        return res.status(404).json({'message' : 'Customer with specified Id cannot be found'});
        }
        customer.name = req.body.name;
        customer.email = req.body.email;
        customer.username = req.body.username;
        customer.password = req.body.password;

        customer.save;

        res.json(customer);
    });

});

//  Updates Customer with customerId using PATCH (updates only the specific aspect)

router.put('/api/customers/:customerId', function(req,res,next) {
    const customerId = req.params.customerId
    Customer.findOneAndUpdate(customerId, function(err,customer){
        if(err){return next (err);
        }
        if(customer === null){
        return res.status(404).json({'message' : 'Customer with specified Id cannot be found'});
        }
        customer.name = customer.name || req.body.name;
        customer.email = customer.email || req.body.email;
        customer.username = customer.username || req.body.username;
        customer.password = customer.password || req.body.password;

        customer.save;

        res.json(customer);
    });

});

module.exports = router;