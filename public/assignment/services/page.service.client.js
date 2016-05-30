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
    function  PageService() {
        var api = {
            createPage: createPage,
            findPageByWebsiteId:findPageByWebsiteId,
            findPageById:findPageById,
            updatePage:updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(websiteId, page) {
            var newPage = {
                _id: (new Date()).getTime()+"",
                name: page.name,
                title: page.title,
                websiteId: websiteId
            };
            pages.push(newPage);
            return true;
        }
        
        function findPageByWebsiteId(websiteId) {
            var resultSet = [];
            for(var i in pages) {
                if(pages[i].websiteId === websiteId) {
                    resultSet.push(pages[i]);
                }
            }
            return resultSet;

        }

        function findPageById(pageId) {
            for(var p in pages){
                if(pages[p]._id === pageId)
                    return pages[p];
            }
            return null;
        }
        
        function updatePage(pageId,page) {
                for(var p in pages){
                    if(pages[p]._id == pageId){
                        pages[p].name = page.name;
                        pages[p].title = page.title;
                        return true;
                    }
                }
            return false;
        }

        function deletePage(pageId) {
            for(var p in pages){
                if(pages[p]._id === pageId) {
                    pages.splice(p, 1);
                    return true;
                }
            }
            return false;
        }
    }

})();
