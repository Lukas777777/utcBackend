(function ()
{
    'use strict';
    var userManager = require('../business/user.manager');
    var router = require('../../server');
    router.route('/api/user/me/optional').get(function (request, response)
    {
        response.send(request.user || {});
    });
    router.route('/api/user/auth').post(function (request, response)
    {
        console.log('aut');
        userManager.authenticate(request.body.email, request.body.password).then(function (result)
        {
            response.status(200).send(result);
        }).catch(function ()
        {
            response.status(401).send({});
        });
    });
})();