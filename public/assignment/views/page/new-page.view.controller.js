(function () {
    angular
        .module('WebAppMaker')
        .controller('NewPageController', NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.createPage = createPage;

        function createPage(page) {
            if (!page || !page.name) {
                vm.msg = {type: 'error', text: 'Page name required'};
            }
            else {
                var newPage = PageService.createPage(vm.websiteId, page);
                if (newPage) {
                    $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
                } else {
                    vm.error = 'Unable to create Page';
                }
            }
        }
    }
})();
