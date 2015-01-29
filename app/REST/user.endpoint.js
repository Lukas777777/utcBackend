(function ()
{
    'use strict';
    var express = require('express');
    var bodyParser = require('body-parser');
    var userManager = require('../business/user.manager');
    var tokenManager = require('../business/token.manager');
    var router = express();
    router.use(bodyParser.urlencoded({extended: false}));
    router.use(bodyParser.json());
    router.route('/me/optional').get(function (request, response)
    {
        tokenManager.getMeOrNull(request.headers.authorization).then(function(result){
            if(result){
                response.status(200).send(result);
            }else{
                response.status(401).send({});
            }
        });
        response.status(200).send({});
    });
    router.route('/auth').post(function (request, response)
    {
        userManager.authenticate(request.body).then(function(result){
           response.status(200).send(result);
        }).catch(function(){
            response.status(401).send({});
        });
    });
    module.exports = router;
})();
/*
* NTRjOTNjZDZkMDYxNTVjMDQzNjBiMTA1
* NTRjOTNjZDZkMDYxNTVjMDQzNjBiMTA1
* */