(function () {
    'use strict';
    angular
        .module('Musix')
        .factory('PostService', PostService);

    function PostService($http) {
        var api = {
            createPost: createPost,
            findPostForUser: findPostForUser
        };

        return api;

        function createPost(userId, post) {
            return $http.post('/project/api/user/' + userId + '/post', {post: post})
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err.body;
                });
        }

        function findPostForUser(userId) {
            return $http.get('/project/api/user/' + userId + '/post', userId)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err.body;
                });
        }
    }
})();