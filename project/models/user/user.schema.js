module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
        },
        firstName: String,
        lastName: String,
        email: String,
        followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
        facebook: {
            id: String,
            token: String
        },
        dateCreated: {
            type: Date,
            default: Date.now
        }
    }, {collection: 'user'});

    return UserSchema;
};