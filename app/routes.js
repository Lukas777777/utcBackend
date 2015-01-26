(function ()
{
    'use strict';
    module.exports = function (app, passport)
    {
        var taskManager = require('./REST/taskManager.js');

        function isLoggedIn(request, response, next)
        {
            if (request.isAuthenticated()) {
                return next();
            } else {
                response.redirect('/');
            }
        }

        app.route('/').get(function (request, response)
        {
            response.render('index.ejs');
        });
        app.route('/login', passport.authenticate('local-login', {
            successRedirect: '/profile', failureRedirect: '/login', failureFlash: true
        }));
        app.get('/signup', passport.authenticate('local-signup', {
            successRedirect: '/profile', failureRedirect: '/signup', failureFlash: 'true'
        }));
        app.get('/profiles', isLoggedIn, function (request, response)
        {

        });
        app.get('/logout', function (request, response)
        {
            request.logout();
            response.redirect('/');
        });
        app.use('/api/task', taskManager);
    };
})();