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
        // updateWebsite: updateWebsite,
        // deleteWebsite: deleteWebsite
    };
    return api;

    function createPost(post) {
        post.hashTags = findHashtags(post.text);
        return Post.create(post);
    }

    function findPostsForUserId(userId) {
        return Post
            .find({_user: userId})
            .populate('_user', 'username');

    }

    function findPostById(id) {
        return Post
            .findById(id);
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

     function deleteWebsite(id) {
     return Website.remove({_id: id});
     }*/
};