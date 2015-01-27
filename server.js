(function ()
{

    'use strict';
    var base64 = require('./app/service/Base64.js');
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

    mongoose.connect(configDB.url + '/users', function (error)
    {
        if (error) {
            console.log(error);
        }
    });

    var app = express();
    require('./config/passport')(passport);
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.set('view engine', 'ejs');
    app.use(session({
        secret: 'ilovescotchscotchyscotchscotch', resave: false, saveUninitialized: true
    }));
    //console.log(JSON.stringify({ title: 'Configure AngularJS routing', description: 'HI',
    //    repositoryUrl: 'https://github.com/aniaw/angular-exercises.git', branchName: 'exercise1',
    //    assignTo: [1, 2], tags: [
    //        {id: 1, text: 'javascript'},
    //        {id: 2, text: 'bootstrap'}
    //    ]}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(cors());
    require('./app/routes.js')(app, passport);
    app.listen(3000);
})();