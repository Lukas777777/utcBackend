(function ()
{
    'use strict';
    module.exports = function (app, passport)
    {
        var taskManager = require('./REST/task.endpoint.js');
        var userManager = require('./REST/user.endpoint.js');

        //function isLoggedIn(request, response, next)
        //{
        //    if (request.isAuthenticated()) {
        //        return next();
        //    } else {
        //        response.redirect('/');
        //    }
        //}
        //
        //app.get('/', function (req, res)
        //{
        //    res.render('index.ejs');
        //});
        //
        //app.get('/profile', isLoggedIn, function (req, res)
        //{
        //    res.render('profile.ejs', {
        //        user: req.user
        //    });
        //});
        //
        //app.get('/logout', function (req, res)
        //{
        //    req.logout();
        //    res.redirect('/');
        //});
        //
        //app.get('/login', function (req, res)
        //{
        //    res.render('login.ejs', {message: req.flash('loginMessage')});
        //});
        //
        //app.post('/login', passport.authenticate('local-login', {
        //    successRedirect: '/profile', // redirect to the secure profile section
        //    failureRedirect: '/login', // redirect back to the signup page if there is an error
        //    failureFlash: true // allow flash messages
        //}));
        //
        //app.get('/signup', function (req, res)
        //{
        //    res.render('signup.ejs', {message: req.flash('signupMessage')});
        //});
        //
        //app.post('/signup', passport.authenticate('local-signup', {
        //    successRedirect: '/profile', // redirect to the secure profile section
        //    failureRedirect: '/signup', // redirect back to the signup page if there is an error
        //    failureFlash: true // allow flash messages
        //}));
        //
        //app.get('/connect/local', function (req, res)
        //{
        //    res.render('connect-local.ejs', {message: req.flash('loginMessage')});
        //});
        //app.post('/connect/local', passport.authenticate('local-signup', {
        //    successRedirect: '/profile', // redirect to the secure profile section
        //    failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
        //    failureFlash: true // allow flash messages
        //}));
        //
        //app.get('/unlink/local', isLoggedIn, function (req, res)
        //{
        //    var user = req.user;
        //    user.local.email = undefined;
        //    user.local.password = undefined;
        //    user.save(function (err)
        //    {
        //        if(err){
        //            console.log(err);
        //        }
        //        res.redirect('/profile');
        //    });
        //});
        app.use('/api/task', taskManager);
        app.use('/api/user', userManager);
    };
})();