(function(){
    angular
        .module('WebAppMaker')
        .controller('PageListController', PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        function init() {
            PageService.findPageByWebsiteId(vm.websiteId)
                .then(function (pages) {
                    vm.pages = pages;
                }, function () {
                    vm.msg = {type: 'error', text: 'Unable to fetch pages'};
                });
        }
        init();
    }
})();
