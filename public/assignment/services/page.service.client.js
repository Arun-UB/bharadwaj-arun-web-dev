    (function () {
        'use strict';
        angular
            .module('WebAppMaker')
            .factory('PageService', PageService);
        var pages =[
            {'_id': '321', 'name': 'Post 1', 'websiteId': '456'},
            {'_id': '432', 'name': 'Post 2', 'websiteId': '456'},
            {'_id': '543', 'name': 'Post 3', 'websiteId': '456'}
        ]; 

        function PageService($http) {
            var api = {
                createPage: createPage,
                findPageByWebsiteId:findPageByWebsiteId,
                findPageById:findPageById,
                updatePage:updatePage,
                deletePage: deletePage,
                updateWidgets: updateWidgets,
                getWidgetOrder: getWidgetOrder,
                updateWidgetOrder: updateWidgetOrder

            };
            return api;


            function createPage(websiteId, page) {
                return $http.post('/api/website/' + websiteId + '/page', page)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function findPageByWebsiteId(websiteId) {
                return $http.get('/api/website/' + websiteId + '/page/')
                    .then(function (response) {
                        return response.data;
                    });
            }

            function findPageById(pageId) {
                return $http.get('/api/page/' + pageId)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function updatePage(pageId,page) {
                return $http.put('/api/page/' + pageId, page)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function deletePage(pageId) {
                return $http.delete('/api/page/' + pageId)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function updateWidgets(pageId, widgetId) {
                return $http.put('/api/page/' + pageId + '/updateWidgets', {widgetId: widgetId})
                    .then(function (response) {
                        return response.data;
                    }, function (error) {
                        return error.data;
                    });
            }

            function getWidgetOrder(pageId) {
                // var order=  ['575b5412b62918a00399575f','575b6d67b62918a003995760',
                //     '575b50533ea44a742d051afb','575bb66d57ea897c174874a1'];
                // return order;
                return $http.get('/api/page/' + pageId + '/widgetOrder')
                    .then(function (response) {
                        return response.data.widgetsOrder;
                    }, function (error) {
                        return error.data;
                    });
            }

            function updateWidgetOrder(pageId, widgetOrder) {
                return $http.put('/api/page/' + pageId + '/widgetOrder', widgetOrder)
                    .then(function (response) {
                        return response.data;
                    }, function (error) {
                        return error.data;
                    });
            }
        }
    })();
