module.exports = function () {
    'use strict';
    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server')();
    var User = mongoose.model('User', UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function updateUser(userId, user) {
        delete user._id;
        return User
            .update({_id: userId}, {
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            });
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password},
            function (err, user) {
                if (!user || err) {
                    return new Error('NoSuchAccountError');
                }
                else {
                    return user;
                }
            });
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function createUser(user) {
        return User.create(user);
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }
};
