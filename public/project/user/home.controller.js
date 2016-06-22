(function () {
    'use strict';
    angular
        .module('Musix')
        .controller('HomeController', HomeController);

    function HomeController(PostService, $rootScope, $sce, $location, $filter, $window) {
        var vm = this;
        var id = $rootScope.currentUser._id;

        function init() {
            PostService
                .findPostForUser(id)
                .then(function (posts) {
                    vm.posts = posts;
                }, function (err) {
                    vm.msg = {type: 'error', text: 'Error loading posts'};
                });
        }

        init();

        vm.createPost = createPost;
        vm.getSafeUrl = getSafeUrl;
        vm.getDate = getDate;

        function createPost(post) {
            post._user = id;
            var link = $filter('parseUrl')(post.text);
            post.link = link ? link[0] : null;
            post.text = $filter('replaceUrl')(post.text);

            PostService.createPost(post)
                .then(function (post) {
                    init();
                }, function (err) {
                    vm.msg = {type: 'error', text: 'Error creating post,try again'};
                });
        }


        function getSafeUrl(yUrl) {
            var urlParts = yUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = 'https://www.youtube.com/embed/' + id;
            return $sce.trustAsResourceUrl(url);

        }

        function getDate(date) {
            return $window.moment() < $window.moment(date).add(22, 'hours') ? 'today' : $window.moment(date).from($window.moment());
        }
    }

})();