module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true
            // validate:{
            //     validator: function (username,callback) {
            //         User.count({username:username})
            //     }
            // }
        },
        password: {
            type: String,
            required: true
        },
        firstName: String,
        lastName: String,
        dob: Date,
        dateCreated: {
            type: Date,
            default: Date.now
        }
    }, {collection: 'user'});

    return UserSchema;
};