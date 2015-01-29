(function ()
{

    'use strict';
    var express = require('express');
    var cors = require('cors');
    var mongoose = require('mongoose');
    var morgan = require('morgan');
    var bodyParser = require('body-parser');
    var configDB = require('./config/database.js');
    var app = module.exports = express();
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(cors());
    mongoose.connect(configDB.url, function (error)
    {
        if (error) {
            console.log(error);
        }
    });

    require('./app/REST/routes.js');
    app.listen(process.env.PORT || 3000);
})();