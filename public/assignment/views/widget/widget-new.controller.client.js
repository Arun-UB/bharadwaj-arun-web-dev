(function () {
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController",NewWidgetController);


    function NewWidgetController( $routeParams,$location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pid;
        vm.wType = $routeParams.wType;

        vm.createWidget = createWidget;

        function createWidget(widget) {
            widget.widgetType = vm.wType;
            WidgetService.createWidget(vm.pageId, widget)
                .then(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                }, function () {
                    vm.msg = {type: "error", text: "Unable to create widget"};
                });
        }
    }
})();
