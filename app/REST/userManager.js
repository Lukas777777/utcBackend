(function(){
    'use strict';
    var express = require('express');
    var bodyParser = require('body-parser');
    var mongoose = require('mongoose');
    var User =require('../models/user.js');
    var router = express();
    var id;
    var configDB=require('../../config/database.js');
    mongoose.createConnection(configDB.url+'/users',function(error){
        if(error){
            console.log(error);
        }
    });
    router.use(bodyParser.urlencoded({extended: false}));
    router.use(bodyParser.json());
    router.route('/').get(function (request, response)
    {
        User.find(null, null, {skip: request.query.from, limit: request.query.size}, function (err, data)
        {
            id=data.length+1;
            response.status(200).send(data);
        });
    });
    module.exports=router;
})();