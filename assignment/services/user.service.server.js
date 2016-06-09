module.exports = function (app, models) {
    'use strict';
    var userModel = models.userModel;

    app.post('/api/user', createUser);
    app.get('/api/user', getUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);

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
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(username, password, res);
        } else if(username) {
            findUserByUsername(username, res);
        } else {
            res.json();
        }
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                return res.json(user);
            }, function () {
                return res.sendStatus(404);
            });
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                return res.json(user);
            }, function () {
                return res.status(404).send('User with username: ' + username + ' not found');
            });
        }
};