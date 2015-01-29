(function ()
{

    'use strict';
    var express = require('express');
    var cors = require('cors');
    var mongoose = require('mongoose');

    var flash = require('connect-flash');
    var morgan = require('morgan');
    var bodyParser = require('body-parser');
    var configDB = require('./config/database.js');

    mongoose.connect(configDB.url, function (error)
    {
        if (error) {
            console.log(error);
        }
    });

    var app = express();

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.set('view engine', 'ejs');

    app.use(flash());
    app.use(cors());
    require('./app/routes.js')(app);
    app.listen(process.env.PORT || 3000);
})();