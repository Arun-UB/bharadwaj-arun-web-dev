module.exports = function (app, models) {
    'use strict';
    var userModel = models.userModel;
    var passport = require('passport');
    var LocalStrategy = require('passport-local');
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require('bcrypt-nodejs');

    var facebookConfig = {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'emails', 'name']
    };

    app.post('/project/api/user', createUser);
    app.post('/project/api/register', register);
    app.get('/project/api/auth/facebook', passport.authenticate('facebook.musix', {scope: 'email'}));
    app.post('/project/api/login', passport.authenticate('musix'), login);
    app.get('/project/api/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#/profile',
            failureRedirect: '/project/#/login'
        }));
    app.post('/project/api/logout', logout);
    app.get('/project/api/loggedIn', loggedIn);

    app.get('/project/api/user', getUser);
    app.get('/project/api/user/:userId', findUserById);
    app.put('/project/api/user/:userId', updateUser);
    app.delete('/project/api/user/:userId', deleteUser);

    passport.use('musix', new LocalStrategy(localStrategy));
    passport.use('facebook.musix', new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {

        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user && bcrypt.compareSync(password, user.password)) {
                    done(null, user);
                }
                else {
                    done(null, false);
                }
            }, function (err) {
                done(err);
            });
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(function (user) {
                if (user) {
                    done(null, user);
                }
                else {
                    var userDetails = {};
                    userDetails.username = profile.name.givenName || 'Anon';
                    userDetails.facebook = {id: profile.id, token: token};
                    return userModel.createUser(userDetails);
                }
            }, function (err) {
                done(err);
            })
            .then(function (user) {
                if (user) {
                    done(null, user);
                }
            }, function (err) {
                done(err);
            });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(function (user) {
                done(null, user);
            }, function (err) {
                done(err, null);
            });
    }

    function register(req, res) {
        var newUser = {};
        newUser.username = req.body.username;
        newUser.password = bcrypt.hashSync(req.body.password);

        userModel
            .findUserByUsername(newUser.username)
            .then(function (user) {
                if (user) {
                    return res.status(400).send('Username is taken');
                } else {
                    return userModel.createUser(newUser);
                }
            }, function (err) {
                return res.status(400).send(err);
            })
            .then(function (user) {
                if (user) {
                    req.login(user, function (err) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            });
    }

    function loggedIn(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        }
        else {
            res.json(null);
        }
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function (user) {
                    return res.status(201).send(user._id);
                },
                function (error) {
                    return res.status(400).send('Username ' + user.username + ' already in use');
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        userModel
            .deleteUser(id)
            .then(function () {
                return res.sendStatus(200);
            }, function () {
                return res.statusCode(404);
            });
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(id, newUser)
            .then(function (user) {
                return res.sendStatus(200);
            }, function () {
                return res.sendStatus(404);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(function (user) {
                return res.json(user);
            }, function () {
                return res.sendStatus(404);
            });
    }

    function getUser(req, res) {
        var username = req.query['username'];
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                return res.json(user);
            }, function () {
                return res.status(404).send('User with username: ' + username + ' not found');
            });
    }
};