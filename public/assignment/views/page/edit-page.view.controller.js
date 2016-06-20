(function () {
    angular
        .module('WebAppMaker')
        .controller('EditPageController', EditPageController);

    function EditPageController($location, $routeParams, $window, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pid;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function init() {
            PageService.findPageById(vm.pageId)
                .then(function (page) {
                    vm.page = page;
                }, function (err) {
                    vm.msg = {type: 'error', text: err.body};
                });
        }

        init();

        function updatePage() {
            if (!vm.page.name) {
                vm.msg = {type: 'error', text: 'Page name required'};
            }
            else {
                PageService.updatePage(vm.pageId, vm.page)
                    .then(function () {
                            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
                        },
                        function (err) {
                            vm.msg = {type: 'error', text: err.body};
                        });
            }
        }

        function deletePage(pageId) {
            var choice = $window.confirm('Are you sure you want to delete?');
            if (choice) {
                PageService.deletePage(pageId, vm.websiteId)
                    .then(function () {
                            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
                        },
                        function (err) {
                            vm.msg = {type: 'error', text: err.body};
                        });
            }
        }
    }
})();

