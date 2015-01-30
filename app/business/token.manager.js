(function ()
{
    'use strict';
    var tokenDAO = require('../DAO/tokenDAO');

    function get(token)
    {
        //id
        return tokenDAO.getMeOrNull(token);
    }

    function getMe()
    {

    }

    module.exports = {
        get: get,
        getMe: getMe
    };
})();