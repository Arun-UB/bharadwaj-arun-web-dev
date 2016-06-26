module.exports = function () {
    var mongoose = require('mongoose');
    var deepPopulate = require('mongoose-deep-populate')(mongoose);

    var PostSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        hashTags: [String],
        text: String,
        link: String,
        comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
        likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'post'});
    PostSchema.plugin(deepPopulate, {
        populate: {'comments._user': {select: 'username'}}
    });

    return PostSchema;
};