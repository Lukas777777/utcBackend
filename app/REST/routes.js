(function ()
{
    'use strict';
    var userManager = require('../business/user.manager');
    var router = require('../../server');

    function authenticate(request, response, next)
    {
        if (!request.headers.authorization) {
            next();
        } else {
            userManager.getUserByToken(request.headers.authorization).then(function (result)
            {
                request.user = result;
            }).finally(next);
        }
    }

    router.use(authenticate);
    router.route('/api/task', require('./task.endpoint'));
    router.route('/api/user', require('./user.endpoint'));
})();