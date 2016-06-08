(function(){
    angular
        .module('WebAppMaker')
        .controller('EditWebsiteController', EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            WebsiteService.findWebsiteById(vm.websiteId, vm.userId)
                .then(function (website) {
                        vm.website = website;
                    },
                    function (err) {
                        vm.msg = {type: 'error', text: err.body};
                    });
        }
        init();

        function updateWebsite() {
            WebsiteService.updateWebsite(vm.websiteId, vm.userId, vm.website)
                .then(function (website) {
                        $location.url('/user/' + vm.userId + '/website');
                    },
                    function (err) {
                        vm.msg = {type: 'error', text: err.body};
                    });
        }

        function deleteWebsite(websiteId) {
            WebsiteService.deleteWebsite(websiteId, vm.userId)
                .then(function () {
                    $location.url('/user/' + vm.userId + '/website');

                }, function (err) {
                    vm.msg = {type: 'error', text: err.body};
                })
        }
    }
})();
