(function ()
{
    'use strict';
    var express = require('express');
    var bodyParser = require('body-parser');
    var taskManager = require('../business/task.manager');
    var Task = require('../DAO/taskDAO.js');
    var router = express();

    router.use(bodyParser.urlencoded({extended: false}));
    router.use(bodyParser.json());

    router.route('/').get(function (request, response)
    {
        taskManager.search({from: request.query.from, size: request.query.size,query:request.query.query}).then(function (result)
        {
            response.status(200).send(result);
        }).catch(function (error)
        {
            response.status(500).send(error);
        });
    }).post(function (request, response)
    {
        taskManager.createNewOrUpdate(request.body).then(function ()
        {
            response.status(200).send(request.body);
        }).catch(function (error)
        {
            response.status(500).send(error);
        });

    });
    router.route('/:id').get(function (request, response)
    {
        taskManager.getDetail(request.params.id).then(function (data)
        {
            response.status(200).send(data);
        }).catch(function (error)
        {
            response.status(500).send(error);
        });
    });
    module.exports = router;
})();