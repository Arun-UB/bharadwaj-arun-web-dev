(function () {
    'use strict';
    angular
        .module('Musix')
        .factory('SearchService', SearchService);

    function SearchService($http, youtubeFactory) {
        var api = {
            getVideos: getVideos,
            searchUsers: searchUsers,
            searchPosts: searchPosts

        };

        return api;

        function getVideos(query) {
            return youtubeFactory.getVideosFromSearchByParams({
                q: query,
                order: 'viewCount',
                relevanceLanguage: 'EN',
                key: 'AIzaSyBprK26aXwQj9eOrbDvoYsxi41hQfV4bSw'
            });
        }

        function searchUsers(query) {
            return $http.get('/project/api/user/search/' + query)
                .then(function (response) {
                    return response.data;
                });
        }

        function searchPosts(query) {
            return $http.get('/project/api/post/search/' + query)
                .then(function (response) {
                    return response.data;
                });
        }
    }

})();