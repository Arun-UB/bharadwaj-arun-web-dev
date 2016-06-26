module.exports = function () {
    'use strict';
    var mongoose = require('mongoose');
    var CommentSchema = require('./comment.schema')();
    var Comment = mongoose.model('Comment', CommentSchema);


    var api = {
        createComment: createComment,
        findCommentsForPost: findCommentsForPost,
        findCommentById: findCommentById,
        updateComment: updateComment,
        deleteComment: deleteComment
    };
    return api;

    function createComment(comment) {
        return Comment.create(comment);
    }

    function findCommentsForPost(postId) {
        return Comment
            .find({_post: postId})
            .populate('_user', 'username')
            .sort('-dateCreated');

    }

    function findCommentById(id) {
        return Comment
            .findById(id)
            .populate('_user', 'username');
    }


    function updateComment(id, comment) {
        return Comment
            .update({_id: id}, {
                $set: {
                    text: comment.name,
                }
            });
    }

    function deleteComment(id) {
        return Comment.remove({_id: id});
    }
};