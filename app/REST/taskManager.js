(function ()
{
    'use strict';
    var express = require('express');
    var bodyParser = require('body-parser');
    var mongoose = require('mongoose');

    var Schema = mongoose.Schema;
    var taskSchema = new Schema({
        _id: false, title: String, description: String, tags: Array
    });
    var Task = mongoose.model('task', taskSchema,'Task');
    var router = express();
    var id;
    var configDB=require('../../config/database.js');
    mongoose.createConnection(configDB.url+'/task',function(error){
        if(error){
            console.log(error);
        }
    });

    router.use(bodyParser.urlencoded({extended: false}));
    router.use(bodyParser.json());
    router.route('/').get(function (request, response)
    {
        Task.find(null, null, {skip: request.query.from, limit: request.query.size}, function (err, data)
        {
            id=data.length+1;
            response.status(200).send(data);
        });
    }).post(function (request, response)
    {
        request.body._id = id;
        var tmp = new Task(request.body);
        tmp.save(function (erorr)
        {
            if (erorr) {
                console.log(erorr);
            }
        });
        response.status(201).json(tmp);
        id++;
    });
    router.route('/:a').get(function (request, response)
    {
        response.send('Details: ' + request.params.a);
    }).delete(function (request, response)
    {
        response.send('You delete me' + request.params.a);
    });
    router.route('/:a/:b').get(function (request, response)
    {
        response.send(request.params.a + ' ' + request.params.b + '\nQuery: ' + request.query.query);
    });


    module.exports = router;
})();