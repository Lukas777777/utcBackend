(function ()
{
    'use strict';
    var express = require('express');
    var bodyParser = require('body-parser');
    var mongoose = require('mongoose');
    var Task =require('../models/task.js');
    var router = express();
    var id;
    var configDB=require('../../config/database.js');
    mongoose.createConnection(configDB.url+'/tasks',function(error){
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
    module.exports = router;
})();