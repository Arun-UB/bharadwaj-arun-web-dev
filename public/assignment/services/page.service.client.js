    (function () {
        'use strict';
        angular
            .module('WebAppMaker')
            .factory('PageService', PageService);

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
                return $http.post('/assignment/api/website/' + websiteId + '/page', page)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function findPageByWebsiteId(websiteId) {
                return $http.get('/assignment/api/website/' + websiteId + '/page/')
                    .then(function (response) {
                        return response.data;
                    });
            }

            function findPageById(pageId) {
                return $http.get('/assignment/api/page/' + pageId)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function updatePage(pageId,page) {
                return $http.put('/assignment/api/page/' + pageId, page)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function deletePage(pageId, websiteId) {
                var config = {
                    method: 'DELETE',
                    url: '/assignment/api/page/' + pageId,
                    headers: {'Content-Type': 'application/json;charset=utf-8'},
                    data: {websiteId: websiteId}
                };
                return $http(config)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function updateWidgets(pageId, widgetId) {
                return $http.put('/assignment/api/page/' + pageId + '/updateWidgets', {widgetId: widgetId})
                    .then(function (response) {
                        return response.data;
                    }, function (error) {
                        return error.data;
                    });
            }

            function getWidgetOrder(pageId) {
                return $http.get('/assignment/api/page/' + pageId + '/widgetOrder')
                    .then(function (response) {
                        return response.data.widgetsOrder;
                    }, function (error) {
                        return error.data;
                    });
            }

            function updateWidgetOrder(pageId, widgetOrder) {
                return $http.put('/assignment/api/page/' + pageId + '/widgetOrder', widgetOrder)
                    .then(function (response) {
                        return response.data;
                    }, function (error) {
                        return error.data;
                    });
            }
        }
    })();
