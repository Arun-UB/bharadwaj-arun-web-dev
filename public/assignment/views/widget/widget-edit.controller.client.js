(function () {
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);


    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pid;
        vm.wType = $routeParams.wType;
        var widgetId = $routeParams.wgid;

        function init() {
            WidgetService.findWidgetById(widgetId)
                .then(function (widget) {
                    vm.widget = widget;
                }, function (err) {
                    vm.msg = {type: "error", text: err.body};
                });
        }

        init();

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function updateWidget(widget) {
            WidgetService.updateWidget(widgetId, widget)
                .then(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                }, function (err) {
                    vm.msg = {type: "error", text: err.body};
                });
            }

        function deleteWidget() {
            WidgetService.deleteWidget(widgetId)
                .then(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                }, function (err) {
                    vm.msg = {type: "error", text: err.body};
                });
            }
        }
})();

