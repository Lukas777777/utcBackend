(function ()
{
    'use strict';

    var Q = require('q');
    var _ = require('underscore');
    var userManager=require('./user.manager');
    function isAuthenticated(context)
    {
        var defer = Q.defer();
        if (!context || !context.user) {
            defer.reject();
        } else {
            userManager.checkUser(context.user).then(function(result){
                defer.resolve(result);
            }).catch(function(result){
                defer.reject(result);
            });
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
