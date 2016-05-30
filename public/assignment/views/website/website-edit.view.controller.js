(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.websiteId,vm.userId);
        }
        init();

        function updateWebsite() {
            console.log(vm.website);
            WebsiteService.updateWebsite(vm.websiteId,vm.website);
            $location.url("/user/"+vm.userId+"/website");
            
        }
        function deleteWebsite(websiteId) {
            var result = WebsiteService.deleteWebsite(websiteId);
            if(result) {
                $location.url("/user/"+vm.userId+"/website");
            } else {
                vm.error = "Unable to delete website";
            }
        }
    }
})();
