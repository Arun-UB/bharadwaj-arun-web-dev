(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    function WebsiteService() {
        var api = {
            createWebsite: createWebsite,
            findWebsitesForUserId: findWebsitesForUserId,
            findWebsiteById:findWebsiteById,
            updateWebsite:updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function updateWebsite(websiteId,website){
            for(w in websites){
                if(websites[w]._id == websiteId){
                    websites[w].name = website.name;
                    websites[w].description = website.description;
                    return true;
                }
            }
            return false;
        }
        function deleteWebsite(websiteId) {
            for(var i in websites) {
                if(websites[i]._id === websiteId) {
                    websites.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        function createWebsite(developerId, name, desc) {
            var newWebsite = {
                _id: (new Date()).getTime()+"",
                name: name,
                description: desc,
                developerId: developerId
            };
            websites.push(newWebsite);
            return newWebsite;
        }

        function findWebsitesForUserId(userId) {
            var resultSet = [];
            for(var i in websites) {
                if(websites[i].developerId === userId) {
                    resultSet.push(websites[i]);
                }
            }
            return resultSet;
        }

        function findWebsiteById(websiteId,userId){
            var websites = findWebsitesForUserId(userId);
            for(var i in websites) {
                if(websites[i]._id === websiteId) {
                    return websites[i];
                }
            }
            return null;
        }
    }
})();
