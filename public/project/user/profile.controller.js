(function () {
        'use strict';
        angular
            .module('Musix')
            .controller('ProfileController', ProfileController);

    function ProfileController($location, $routeParams, $rootScope, UserService, PostService) {
            var vm = this;
        vm.id = $routeParams.id;
            vm.logout = logout;
        vm.follow = follow;
        vm.following = following;
        vm.user = {};

        function init() {
            UserService
                .findUserById(vm.id)
                .then(function (user) {
                    vm.user = user;
                    vm.user.pFlag = $rootScope.currentUser._id === vm.id;

                    PostService
                        .findPostForUser(user._id)
                        .then(function (posts) {
                            vm.posts = posts;

                        });
                });
        }

        init();

            function logout() {
                UserService.logout()
                    .then(function () {
                        $location.url('/login');
                    });

            }

        function following() {
            return ($rootScope.currentUser.following.indexOf(vm.id) === -1) ? false : true;
        }

        function follow() {
            var value = !vm.following();
            UserService
                .followUser($rootScope.currentUser._id, vm.id, value)
                .then(function (user) {
                    UserService.updateFollowers($rootScope.currentUser._id, vm.id, value)
                        .then(function () {
                            if (value) {
                                vm.user.following.push(vm.id);
                            }
                            else {
                                vm.user.following = _.without(vm.user.following, vm.id);
                            }
                        });

                });
            }
        }
    })();