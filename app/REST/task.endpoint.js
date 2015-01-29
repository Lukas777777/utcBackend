(function ()
{
    'use strict';
    var business = require('../business/business.container');
    var router = require('../../server');
    router.route('/api/task').get(function (request, response)
    {
        var query = {from: request.query.from, size: request.query.size, query: request.query.query};
        business.getTaskManager(request).search(query).then(function (result)
        {
            response.status(200).send(result);
        }).catch(function (error)
        {
            response.status(401).send(error);
        });
    }).post(function (request, response)
    {
        business.getTaskManager(request).createNewOrUpdate(request.body).then(function ()
        {
            response.status(200).send(request.body);
        }).catch(function ()
        {
            response.sendStatus(500);
        });

    });
    router.route('/api/task/:id').get(function (request, response)
    {
        business.getTaskManager(request).getDetail(request.params.id).then(function (data)
        {
            response.status(200).send(data);
        }).catch(function (error)
        {
            response.status(500).send(error);
        });
    }).delete(function (request, response)
    {
        business.getTaskManager(request).deleteTask(request.params.id).then(function ()
        {
            response.status(200).send();
        }).catch(function ()
        {
            response.status(404);
        });

    });
})();