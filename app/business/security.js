(function ()
{
    'use strict';

    var Q = require('q');
    var _ = require('underscore');

    function isAuthenticated(context)
    {
        var defer = Q.defer();
        if (!context || !context.user) {
            defer.reject();
        } else {
            defer.resolve();
        }
        return defer.promise;
    }

    function checkRoles(context)
    {
        var user = context && context.user;
        var defer = Q.defer();
        if (!user || !user.role) {
            defer.reject();
        } else if (_.intersection(user.role, arguments).length) {
            defer.resolve();
        } else {
            defer.reject();
        }
        return defer.promise;
    }

    module.exports = {
        ADMIN: 'admin', USER: 'user', isAuthenticated: isAuthenticated, checkRoles: checkRoles
    };
})();
