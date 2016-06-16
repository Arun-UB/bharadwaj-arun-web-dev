module.exports = function (app, models) {
    'use strict';
    var userModel = models.userModel;
    var passport = require('passport');
    var LocalStrategy = require('passport-local');

    app.post('/assignment/api/user', createUser);
    app.post('/assignment/api/register', register);
    app.post('/assignment/api/login', passport.authenticate('local'), login);
    app.post('/assignment/api/logout', logout);
    app.get('/assignment/api/loggedIn', loggedIn);
    app.get('/assignment/api/user', getUser);
    app.get('/assignment/api/user/:userId', findUserById);
    app.put('/assignment/api/user/:userId', updateUser);
    app.delete('/assignment/api/user/:userId', deleteUser);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {

        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user) {
                    done(null, user);
                }
                else {
                    done(null, false);
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
        var username = req.body.username;
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user) {
                    return res.status(400).send('Username is taken');
                } else {
                    return userModel.createUser(req.body);
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