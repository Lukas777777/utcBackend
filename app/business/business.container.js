(function ()
{
    'use strict';

    var taskManager = require('./task.manager');
    var tokenManager = require('./token.manager');

    function getContext(request)
    {
        return {user: request.user};
    }

    function getter(manager)
    {
        return function (request)
        {
            return manager.create(getContext(request));
        };
    }


    module.exports = {
        getTaskManager: getter(taskManager),
        getTokenManager: getter(tokenManager)
    };
})();