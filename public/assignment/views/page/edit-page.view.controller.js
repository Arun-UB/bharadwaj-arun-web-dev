(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($location, $routeParams, PageService) {
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
                    vm.msg = {type: "error", text: err.body};
                });
        }
        init();

        function updatePage() {
            PageService.updatePage(vm.pageId, vm.page)
                .then(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    },
                    function (err) {
                        vm.msg = {type: "error", text: err.body};
                    });
        }
        function deletePage(pageId) {
            var result = PageService.deletePage(pageId)
                .then(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    },
                    function (err) {
                        vm.msg = {type: "error", text: err.body};
                    });
        }
    }
})();

