(function () {
        'use strict';
        angular
            .module('Musix')
            .controller('ProfileController', ProfileController);

    function ProfileController($location, $routeParams, $rootScope, $sce, $window, UserService, PostService, CommentService) {
            var vm = this;
        vm.id = $routeParams.id;
            vm.logout = logout;
        vm.follow = follow;
        vm.following = following;
        vm.getSafeUrl = getSafeUrl;
        vm.createComment = createComment;
        vm.getDate = getDate;
        vm.like = like;
        vm.liked = liked;
        vm.user = {};
        vm.comment = {};

        function init() {
            UserService
                .findUserById(vm.id)
                .then(function (user) {
                    vm.user = user;
                    vm.user.pFlag = $rootScope.currentUser._id === vm.id;

                    PostService
                        .getUserPosts(user._id)
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
            return (($rootScope.currentUser.following.indexOf(vm.id) === -1) ? false : true);
        }

        function follow() {
            var value = !vm.following();
            UserService
                .followUser($rootScope.currentUser._id, vm.id, value)
                .then(function (user) {
                    UserService.updateFollowers($rootScope.currentUser._id, vm.id, value)
                        .then(function () {
                            if (value) {
                                $rootScope.currentUser.following.push(vm.id);
                                vm.user.followers.push($rootScope.currentUser._id);
                            }
                            else {
                                $rootScope.currentUser.following = _.without(vm.user.following, vm.id);
                                vm.user.followers = _.without(vm.user.following, $rootScope.currentUser._id);
                            }
                        });

                });
            }

        function liked(post) {
            return (post.likes.indexOf(vm.id) === -1) ? false : true;
        }

        function like(post) {
            var postId = post._id;
            var value = !vm.liked(post);
            PostService.likePost(vm.id, postId, value)
                .then(function (post) {
                    var i = -1;
                    for (var p in vm.posts) {
                        if (vm.posts[p]._id === postId) {
                            i = p;
                        }
                    }
                    if (value) {
                        vm.posts[i].likes.push(vm.id);

                    }
                    else {
                        vm.posts[i].likes = _.without(vm.posts[i].likes, vm.id);
                    }
                });
        }

        function createComment(post) {
            if (vm.comment) {
                CommentService
                    .createComment(vm.id, post._id, vm.comment)
                    .then(function (comment) {
                        CommentService
                            .findCommentById(vm.id, post._id, comment._id)
                            .then(function (comment) {
                                var i;
                                for (var p in vm.posts) {
                                    if (vm.posts[p]._id === post._id) {
                                        i = p;
                                    }
                                }
                                vm.posts[i].comments.push(comment);
                                vm.comment = {};
                            });
                    });


            }
        }
        function getSafeUrl(yUrl) {
            var url = 'https://www.youtube.com/embed/' + yUrl;
            return $sce.trustAsResourceUrl(url);

        }

        function getDate(date) {
            return $window.moment() < $window.moment(date).add(22, 'hours') ? 'today' : $window.moment(date).from($window.moment());
        }
        }

})();