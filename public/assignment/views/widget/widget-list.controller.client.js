(function(){
    'use strict';
    angular
        .module('WebAppMaker')
        .controller('WidgetListController', WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pid;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;

        function init() {
            WidgetService.findWidgetsForPageId(vm.pageId)
                .then(function (widgets) {
                    vm.widgets = widgets;
                }, function () {
                    vm.msg = {type: 'error', text: 'Unable to load widgets'};
                });
        }
        init();

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = 'https://www.youtube.com/embed/' + id;
            return $sce.trustAsResourceUrl(url);

        }
    }
})();
