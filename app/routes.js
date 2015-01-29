(function ()
{
    'use strict';
    module.exports = function (app)
    {
        var taskManager = require('./REST/task.endpoint.js');
        var userManager = require('./REST/user.endpoint.js');
        app.use('/api/task', taskManager);
        app.use('/api/user', userManager);
    };
})();