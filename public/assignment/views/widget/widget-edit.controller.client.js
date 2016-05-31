(function () {
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController",EditWidgetController);


    function EditWidgetController( $routeParams,$location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pid;
        vm.wType = $routeParams.wType;
        var widgetId = $routeParams.wgid;
        function init() {
            vm.widget = WidgetService.findWidgetById(widgetId);
        }
        init();
        vm.updateWidget = updateWidget;
        vm.deleteWidget= deleteWidget;

        function updateWidget(widget) {
            if(WidgetService.updateWidget(widgetId,widget)) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            } else {
                vm.error = "Unable to create Page";
            }
        }

        function deleteWidget() {
            if(WidgetService.deleteWidget(widgetId)) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            } else {
                vm.error = "Unable to delete Widget";
            }
        }

    }
})();

