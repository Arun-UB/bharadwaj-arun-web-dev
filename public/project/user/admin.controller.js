(function () {
    'use strict';

    angular
        .module('Musix')
        .controller('AdminController', AdminController);

    function AdminController(UserService, PostService) {

        var vm = this;
        vm.current = 'User';
        vm.loadData = loadData;
        function init() {
            UserService.getUsers()
                .then(function (users) {
                    vm.users = users;
                });
        }

        init();

        function loadData() {
            if (vm.current === 'User') {
                UserService.getUsers()
                    .then(function (users) {
                        vm.users = users;
                    });
            }
            if (vm.current === 'Post') {
                PostService.getPosts()
                    .then(function (users) {
                        vm.posts = posts;
                    });
            }
        }
    }
})();