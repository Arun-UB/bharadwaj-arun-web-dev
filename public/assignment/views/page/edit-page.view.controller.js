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
            vm.page = PageService.findPageById(vm.pageId);
            console.log(vm.page);
        }
        init();

        function updatePage() {
            console.log(vm.page);
            PageService.updatePage(vm.pageId,vm.page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");

        }
        function deletePage(pageId) {
            var result = PageService.deletePage(pageId);
            if(result) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            } else {
                vm.error = "Unable to delete Page";
            }
        }
    }
})();

