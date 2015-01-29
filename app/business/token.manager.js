(function(){
    'use strict';
    var tokenDAO = require('../DAO/tokenDAO');

    function getMeOrNull(token){
        return tokenDAO.getMeOrNull(token);
    }

    function getMe(){

    }
    module.exports={
        getMeOrNull:getMeOrNull,
        getMe:getMe
    };
})();