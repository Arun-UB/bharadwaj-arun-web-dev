(function(){
    angular
        .module('WebAppMaker')
        .controller('EditWebsiteController', EditWebsiteController);

    function EditWebsiteController($location, $routeParams, $window, WebsiteService) {
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
            if (!vm.website.name) {
                vm.msg = {type: 'error', text: 'Website name required'};
            }
            else {
                WebsiteService.updateWebsite(vm.websiteId, vm.userId, vm.website)
                    .then(function (website) {
                            $location.url('/user/' + vm.userId + '/website');
                        },
                        function (err) {
                            vm.msg = {type: 'error', text: err.body};
                        });
            }
        }

        function deleteWebsite(websiteId) {
            var choice = $window.confirm('Are you sure you want to delete?');
            if (choice) {
                WebsiteService.deleteWebsite(websiteId, vm.userId)
                    .then(function () {
                        $location.url('/user/' + vm.userId + '/website');

                    }, function (err) {
                        vm.msg = {type: 'error', text: err.body};
                    });
            }

        }
    }
})();
