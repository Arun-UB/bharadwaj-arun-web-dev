(function () {
    "use strict";
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);
    var pages =[
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ]
    function  PageService() {
        var api = {
            createPage: createPage,
            findPagesForUserId: findPagesForUserId,
            findPageById:findPageById,
            updatePage:updatePage,
            deletePage: deletePage
        };

        function createPage(websiteId, name, title) {
            var newPage = {
                _id: (new Date()).getTime()+"",
                name: name,
                title: title,
                websiteId: websiteId
            };
            pages.push(newPage);
            return true;
        }

        return api;
    }

})();
