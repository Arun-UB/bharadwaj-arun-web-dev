(function () {
    'use strict';
    angular
        .module('Musix')
        .factory('CommentService', CommentService);

    function CommentService($http) {
        var api = {
            createComment: createComment,
            findCommentsForPost: findCommentsForPost,
            findCommentById: findCommentById,
            updateComment: updateComment,
            deleteComment: deleteComment
        };

        return api;

        function createComment(userId, postId, comment) {
            return $http.post('/project/api/user/' + userId + '/post/' + postId + '/comment',
                {comment: comment})
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err.body;
                });
        }

        function findCommentsForPost(userId, postId, comment) {
            return $http.get('/project/api/user/' + userId + '/post/' + postId + '/comment')
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err.body;
                });
        }

        function findCommentById(userId, postId, commentId) {
            return $http.get('/project/api/user/' + userId + '/post/' + postId + '/comment/' + commentId)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err.body;
                });
        }

        function updateComment(userId, postId, commentId, comment) {
            return $http.put('/project/api/user/' + userId + '/post/' + postId + '/comment/' + commentId, comment)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err.body;
                });
        }

        function deleteComment(userId, postId, commentId) {
            return $http.delete('/project/api/user/' + userId + '/post/' + postId + '/comment/' + commentId)
                .then(function (response) {
                    return response.data;
                });

        }
    }
})();