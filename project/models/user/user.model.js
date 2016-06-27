module.exports = function () {
    'use strict';
    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema')();
    var User = mongoose.model('User', UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserByGoogleId: findUserByGoogleId,
        followUser: followUser,
        updateUser: updateUser,
        updateFollowers: updateFollowers,
        searchUsers: searchUsers,
        deleteUser: deleteUser
    };
    return api;

    function updateUser(userId, user) {
        delete user._id;
        return User
            .update({_id: userId}, {
                $set: {
                    username: user.username,
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

    function findUserByGoogleId(facebookId) {
        return User.findOne({'facebook.id': facebookId});
    }

    function searchUsers(query) {
        return User.find({username: {'$regex': query}}).select('-password');
    }

    function followUser(userId, userIdToFollow, value) {
        if (value) {
            return User
                .findByIdAndUpdate({_id: userId}, {
                    $push: {
                        following: userIdToFollow
                    }
                });
        }
        else {
            return User
                .findByIdAndUpdate({_id: userId}, {
                    $pull: {
                        following: userIdToFollow
                    }
                })
        }
    }

    function updateFollowers(userId, userIdToFollow, value) {
        if (value) {
            return User
                .findByIdAndUpdate({_id: userIdToFollow}, {
                    $push: {
                        followers: userId
                    }
                });
        }
        else {
            return User
                .findByIdAndUpdate({_id: userIdToFollow}, {
                    $pull: {
                        followers: userId
                    }
                });
        }

    }
};
