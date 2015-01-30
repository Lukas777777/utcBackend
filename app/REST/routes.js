(function ()
{
    'use strict';
    var userManager = require('../business/user.manager');
    var router = require('../server');

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
    require('./task.endpoint');
    require('./test.endpoint');
    require('./user.endpoint');
    require('./trial.endpoint');
})();