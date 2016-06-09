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
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Website'}],
        dateCreated: {
            type: Date,
            default: Date.now
        }
    }, {collection: 'assignment.user'});

    return UserSchema;
};