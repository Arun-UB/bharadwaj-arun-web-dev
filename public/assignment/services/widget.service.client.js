(function () {
    'use strict';
    angular
        .module('WebAppMaker')
        .factory('WidgetService', WidgetService);


    function WidgetService($http) {
        var api = {
            findWidgetsForPageId: findWidgetsForPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            createWidget: createWidget,
            deleteWidget: deleteWidget,
            uploadImage: uploadImage

        };

        return api;

        function findWidgetsForPageId(pageId) {
            return $http.get('/assignment/api/page/' + pageId + '/widget')
                .then(function (response) {
                    return response.data;
                });
        }

        function createWidget(pageId,widget) {
            return $http.post('/assignment/api/page/' + pageId + '/widget', widget)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findWidgetById(widgetId) {
            return $http.get('/assignment/api/widget/' + widgetId)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function updateWidget(widgetId,widget) {
            return $http.put('/assignment/api/widget/' + widgetId, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWidget(widgetId, pageId) {
            var config = {
                method: 'DELETE',
                url: '/assignment/api/widget/' + widgetId,
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                data: {pageId: pageId}
            };
            return $http(config)
                .then(function (response) {
                    return response.data;
                });
        }

        function uploadImage(file) {
            return $http.post('/assignment/api/upload', file)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();