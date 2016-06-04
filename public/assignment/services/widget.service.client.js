(function () {
    "use strict";
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);


    function WidgetService($http) {
        var api = {
            findWidgetsForPageId: findWidgetsForPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            createWidget: createWidget,
            deleteWidget: deleteWidget
        };

        return api;

        function findWidgetsForPageId(pageId) {
            return $http.get("/api/page/" + pageId + "/widget")
                .then(function (response) {
                    return response.data;
                });
        }

        function createWidget(pageId,widget) {
            return $http.post("/api/page/" + pageId + "/widget", widget)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findWidgetById(widgetId) {
            return $http.get("/api/widget/" + widgetId)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function updateWidget(widgetId,widget) {
            return $http.put("/api/widget/" + widgetId, widget)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function deleteWidget(widgetId){
            return $http.delete("/api/widget/" + widgetId)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();