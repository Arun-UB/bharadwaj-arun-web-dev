(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);
    
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;

        function init() {
            WebsiteService.findWebsitesForUserId(vm.userId)
                .then(function (websites) {
                        vm.websites = websites;
                    },
                    function (err) {
                        vm.msg = {type: "error", text: "Unable to fetch websites"};
                    });
        }
        init();
    }
})();
