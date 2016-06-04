(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;
        
        function createWebsite(name, description) {
            WebsiteService.createWebsite(vm.userId, name, description)
                .then(function (website) {
                    $location.url("/user/" + vm.userId + "/website");
                }, function (err) {
                    vm.msg = {type: "error", text: "Unable to create website"};
                })
        }
    }
})();
