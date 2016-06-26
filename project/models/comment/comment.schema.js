module.exports = function () {
    var mongoose = require('mongoose');
    var CommentSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        text: String,
        _post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'comment'});
    return CommentSchema;
};