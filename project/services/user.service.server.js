module.exports = function (app, models) {
    'use strict';
    var userModel = models.userModel;
    var passport = require('passport');
    var LocalStrategy = require('passport-local');
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var bcrypt = require('bcrypt-nodejs');
    bcrypt.genSaltSync(1);

    var googleConfig = {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    };

    app.post('/project/api/user', createUser);
    app.post('/project/api/register', register);
    app.get('/project/api/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    app.post('/project/api/login', passport.authenticate('musix'), login);
    app.get('/project/api/auth/google/oauth2callback',
        passport.authenticate('google', {
            successRedirect: '/project/#/profile',
            failureRedirect: '/project/#/login'
        }));
    app.post('/project/api/logout', logout);
    app.get('/project/api/loggedIn', loggedIn);

    app.get('/project/api/user', getUser);
    app.get('/project/api/user/:userId', findUserById);
    app.get('/project/api/user/search/:query', searchUsers);
    app.put('/project/api/user/:userId', updateUser);
    app.put('/project/api/user/:userId/follow', followUser);
    app.put('/project/api/user/:userId/updateFollowers', updateFollowers);
    app.delete('/project/api/user/:userId', deleteUser);

    passport.use('musix', new LocalStrategy(localStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
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

    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(function (user) {
                if (user) {
                    done(null, user);
                }
                else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split('@');
                    var newGoogleUser = {
                        username: emailParts[0],
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: email,
                        google: {
                            id: profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
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

    function searchUsers(req, res) {
        var query = req.params.query;
        userModel
            .searchUsers(query)
            .then(function (users) {
                return res.json(users);
            }, function () {
                return res.sendStatus(200);
            });
    }

    function followUser(req, res) {
        var userId = req.params.userId;
        var userIdToFollow = req.body.userIdToFollow;
        var value = req.body.value;

        userModel
            .followUser(userId, userIdToFollow, value)
            .then(function (user) {
                return res.sendStatus(200);
            }, function () {
                return res.sendStatus(400);
            });

    }

    function updateFollowers(req, res) {
        var userId = req.params.userId;
        var userIdToFollow = req.body.userIdToFollow;
        var value = req.body.value;

        userModel
            .updateFollowers(userId, userIdToFollow, value)
            .then(function (user) {
                return res.sendStatus(200);
            }, function () {
                return res.sendStatus(400);
            });

    }
};