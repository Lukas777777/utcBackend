(function ()
{
    'use strict';
    var express = require('express');
    var bodyParser = require('body-parser');
    var mongo = require('mongoose');
    mongo.connect('mongodb://localhost/tasks');
    var taskSchema = {
        _id: false, title: String, description: String, tags: Array
    };
    var task = mongo.model('task', taskSchema, 'tasks');
    var router = express();
    router.use(bodyParser.urlencoded({extended:false}));
    router.use(bodyParser.json());
    router.route('/')
            .get(function (request, response)
            {
                task.find(null, null, {skip: request.query.from, limit: request.query.size}, function (err, data)
                {
                    response.status(200).send(data);
                });
            })
            .post( function (request, response)
            {
                response.status(201).json(request.body);
            });
    router.route('/:a')
            .get(function (request, response)
    {
        response.send('Details: ' + request.params.a);
    })
            .delete(function (request, response)
    {
        response.send('You delete me' + request.params.a);
    });
    router.route('/:a/:b').get(function (request, response)
    {
        response.send(request.params.a + ' ' + request.params.b);
    });


    module.exports = router;
})();