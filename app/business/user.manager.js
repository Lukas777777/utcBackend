(function(){
    'use strict';
    var userDAO=require('../DAO/userDAO');

    function authenticate(user){
        return userDAO.authenticate(user);
    }

    module.exports={
        authenticate:authenticate
    };
})();