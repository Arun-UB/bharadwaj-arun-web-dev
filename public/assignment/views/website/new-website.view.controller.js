(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;
        
        function createWebsite(name, description) {
            var newWebsite = WebsiteService.createWebsite(vm.userId, name, description);
            if(newWebsite) {
                $location.url("/user/"+vm.userId+"/website");
            } else {
                vm.error = "Unable to create website";
            }
        }
    }
})();
