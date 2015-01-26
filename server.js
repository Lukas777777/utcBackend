(function ()
{

    'use strict';
    var express = require('express');
    var cors = require('cors');
    var mongoose = require('mongoose');
    var passport = require('passport');
    var flash = require('connect-flash');
    var morgan = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var session = require('express-session');
    var configDB = require('./config/database.js');

    mongoose.connect(configDB.url+'/users', function (error)
    {
        if (error) {
            console.log(error);
        }
    });

    var app = express();
    require('./config/passport')(passport);
    //app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.set('view engine', 'ejs');
    app.use(session({
        secret: 'ilovescotchscotchyscotchscotch', resave: false, saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(cors());

    require('./app/routes.js')(app,passport);
    app.listen(3000);
})();