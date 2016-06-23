module.exports = function () {
    'use strict';
    var mongoose = require('mongoose');
    var findHashtags = require('find-hashtags');
    var PostSchema = require('./post.schema')();
    var Post = mongoose.model('Post', PostSchema);

    var api = {
        createPost: createPost,
        findPostsForUserId: findPostsForUserId,
        findPostById: findPostById,
        likePost: likePost,
        deletePost: deletePost
    };
    return api;

    function createPost(post) {
        post.hashTags = findHashtags(post.text);
        return Post.create(post);
    }

    function findPostsForUserId(userId) {
        return Post
            .find({_user: userId})
            .populate('_user', 'username')
            .sort('-dateCreated');

    }

    function findPostById(id) {
        return Post
            .findById(id)
            .populate('_user', 'username');
    }

    function likePost(userId, postId, value) {
        if (value) {
            return Post
                .update({_id: postId}, {
                    $push: {
                        likes: userId
                    }
                });
        }
        else {
            return Post
                .update({_id: postId}, {
                    $pull: {
                        likes: userId
                    }
                });
        }

    }

    /*function updateWebsite(id, website) {
     return Website
     .update({_id: id}, {
     $set: {
     name: website.name,
     description: website.description
     }
     });
     }
     */
    function deletePost(id) {
        return Post.remove({_id: id});
    }
};