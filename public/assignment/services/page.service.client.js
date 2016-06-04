    (function () {
        "use strict";
        angular
            .module("WebAppMaker")
            .factory("PageService",PageService);
        var pages =[
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];

        function PageService($http) {
            var api = {
                createPage: createPage,
                findPageByWebsiteId:findPageByWebsiteId,
                findPageById:findPageById,
                updatePage:updatePage,
                deletePage: deletePage
            };
            return api;


            function createPage(websiteId, page) {
                return $http.post("/api/website/" + websiteId + "/page", page)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function findPageByWebsiteId(websiteId) {
                return $http.get("/api/website/" + websiteId + "/page/")
                    .then(function (response) {
                        return response.data;
                    });
            }

            function findPageById(pageId) {
                return $http.get("/api/page/" + pageId)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function updatePage(pageId,page) {
                return $http.put("/api/page/" + pageId, page)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function deletePage(pageId) {
                return $http.delete("/api/page/" + pageId)
                    .then(function (response) {
                        return response.data;
                    });
            }
        }
    })();
