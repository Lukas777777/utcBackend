(function ()
{
    'use strict';
    var userDAO = require('../DAO/userDAO');
    var tokenManager = require('./token.manager');

    function authenticate(email, password)
    {
        return userDAO.authenticate(email, password);
    }

    function getUserByToken(token)
    {
        return tokenManager.get(token).then(function (idUser)
        {
            return userDAO.get(idUser);
        });
    }
    function checkUser(user){
        return userDAO.checkUser(user);
    }

    module.exports = {
        authenticate: authenticate, getUserByToken: getUserByToken,checkUser:checkUser
    };
})();