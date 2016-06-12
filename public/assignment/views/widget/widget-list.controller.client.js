(function(){
    'use strict';
    angular
        .module('WebAppMaker')
        .controller('WidgetListController', WidgetListController);

    function WidgetListController($sce, $routeParams, $filter, $q, WidgetService, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pid;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.updateOrder = updateOrder;
        vm.reorder = reorder;


        function init() {
            $q.all([WidgetService.findWidgetsForPageId(vm.pageId), PageService.getWidgetOrder(vm.pageId)])
                .then(function (res) {

                    vm.widgets = vm.reorder(res[1], res[0]);
                    vm.widgets = $filter('orderBy')(vm.widgets, 'pos');
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

        function updateOrder(order) {
            console.log(order);
            PageService
                .updateWidgetOrder(vm.pageId, order)
                .then(function () {
                    console.log('Updated');
                });
        }

        function reorder(order, widgets) {
            widgets.forEach(function (w) {
                w.pos = order.indexOf(w._id);
            });
            return widgets;
        }
        
    }
})();
