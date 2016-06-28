module.exports = function () {
    'use strict';
    var mongoose = require('mongoose');
    var findHashtags = require('find-hashtags');
    var PostSchema = require('./post.schema')();
    var Post = mongoose.model('Post', PostSchema);

    var api = {
        createPost: createPost,
        findPostsForUserId: findPostsForUserId,
        getUserPosts: getUserPosts,
        findPostById: findPostById,
        getPosts: getPosts,
        likePost: likePost,
        updatePost: updatePost,
        searchPosts: searchPosts,
        deletePost: deletePost
    };
    return api;

    function createPost(post) {
        post.hashTags = findHashtags(post.text);
        return Post.create(post);
    }

    function findPostsForUserId(uList) {
        return Post
            .find({_user: {'$in': uList}}, {})
            .populate('_user', 'username')
            .deepPopulate('comments._user')
            .sort('-dateCreated');

    }

    function getUserPosts(userId) {
        return Post
            .find({_user: userId})
            .populate('_user', 'username')
            .deepPopulate('comments._user')
            .sort('-dateCreated');
    }

    function searchPosts(query) {
        return Post.find({text: new RegExp(query, 'i')}).populate('_user', 'username');
    }

    function findPostById(id) {
        return Post
            .findById(id)
            .populate('_user', 'username');
    }

    function getPosts() {
        return Post
            .find()
            .populate('_user', 'username');
    }

    function likePost(userId, postId, value) {
        if (value) {
            return Post
                .findByIdAndUpdate({_id: postId}, {
                    $push: {
                        likes: userId
                    }
                });
        }
        else {
            return Post
                .findByIdAndUpdate({_id: postId}, {
                    $pull: {
                        likes: userId
                    }
                }).exec();
        }

    }

    function updatePost(id, post) {
        return Post
            .update({_id: id}, {
                $set: {
                    text: post.text,
                    link: post.link
                }
            });
    }


    function deletePost(id) {
        return Post.remove({_id: id});
    }
};