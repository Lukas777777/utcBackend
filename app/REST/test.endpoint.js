(function ()
{
    'use strict';
    var business = require('../business/business.container');
    var router = require('../../server');
    router.route('/api/test').get(function (request, response)
    {
        var query = {from: request.query.from, size: request.query.size, query: request.query.query};
        business.getTestManager(request).search(query).then(function (result)
        {
            response.status(200).send(result);
        }).catch(function (error)
        {
            response.status(401).send(error);
        });
    }).post(function (request, response)
    {
        business.getTestManager(request).createNewTest(request.body).then(function ()
        {
            response.status(200).send(request.body);
        }).catch(function ()
        {
            response.sendStatus(500);
        });

    });
    router.route('/api/test/task').post(function (request, response)
    {
        response.sendStatus(200);
    });
    router.route('/api/test/:id').get(function (request, response)
    {
        business.getTestManager(request).getDetail(request.params.id).then(function (data)
        {
            response.status(200).send(data);
        }).catch(function (error)
        {
            response.status(500).send(error);
        });
    });
    router.route('/api/test/:id/task').get(function (request, response)
    {
        business.getTestManager(request).getTask(request.params.id).then(function (data)
        {
            response.status(200).send(data);
        }).catch(function (error)
        {
            response.status(500).send(error);
        });
    });

})();