(function () {
    'use strict';
    angular
        .module('Musix')
        .controller('EditPostController', EditPostController);

    function EditPostController($routeParams, $rootScope, $location, $window, PostService) {
        var vm = this;
        var id = $routeParams.id;
        vm.updatePost = updatePost;
        vm.deletePost = deletePost;

        function init() {
            PostService
                .findPostById($rootScope.currentUser._id, id)
                .then(function (post) {
                    vm.post = post;
                });
        }

        init();

        function updatePost() {
            PostService.updatePost(vm.post, id, $rootScope.currentUser._id)
                .then(function () {
                    vm.msg = {type: 'success', text: 'Post saved'};

                }, function () {
                    vm.msg = {type: 'error', text: 'Unable to save changes'};
                });

        }

        function deletePost() {
            var choice = $window.confirm('Are you sure you want to delete?');
            if (choice) {
                PostService.deletePost(id, $rootScope.currentUser._id)
                    .then(function () {
                        $location.url('/admin');
                    }, function () {
                        vm.msg = {type: 'error', text: 'Unable to delete changes'};
                    });
            }
        }
    }

})();