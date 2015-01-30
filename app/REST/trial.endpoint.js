(function ()
{
    'use strict';
    var business = require('../business/business.container');
    var router = require('../server');
    router.route('/api/trial').get(function (request, response)
    {
        var query = {from: request.query.from, size: request.query.size, query: request.query.query};
        business.getTrialManager(request).search(query).then(function (result)
        {
            response.status(200).send(result);
        }).catch(function (error)
        {
            response.status(401).send(error);
        });
    }).post(function (request, response)
    {
        business.getTrialManager(request).createNewOrUpdate(request.body).then(function ()
        {
            response.status(200).send(request.body);
        }).catch(function ()
        {
            response.sendStatus(500);
        });

    });
    module.exports=router;
})();