(function(){
    'use strict';
    angular
        .module('WebAppMaker')
        .factory('WebsiteService', WebsiteService);


    function WebsiteService($http) {
        var api = {
            createWebsite: createWebsite,
            findWebsitesForUserId: findWebsitesForUserId,
            findWebsiteById:findWebsiteById,
            updateWebsite:updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function updateWebsite(websiteId, userId, website) {
            return $http.put('/api/user/' + userId + '/website/' + websiteId, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsite(websiteId, userId) {
            return $http.delete('/api/user/' + userId + '/website/' + websiteId)
                .then(function (response) {
                    return response.data;
                });
           
        }

        function createWebsite(userId, name, description) {
            return $http.post('/api/user/' + userId + '/website',
                {name: name, description: description})
                .then(function (response) {
                    return response.data;
                });
        }

        function findWebsitesForUserId(userId) {
            return $http.get('/api/user/' + userId + '/website')
                .then(function (response) {
                    return response.data;
                });
        }

        function findWebsiteById(websiteId,userId){
            return $http.get('/api/user/' + userId + '/website/' + websiteId)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
