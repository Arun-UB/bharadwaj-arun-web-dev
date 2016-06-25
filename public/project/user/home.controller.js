(function () {
    angular
        .module('Musix')
        .controller('HomeController', HomeController);

    function HomeController(PostService, $rootScope, $sce, $location, $filter, $window, youtubeEmbedUtils) {
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

        vm.post = null;
        vm.createPost = createPost;
        vm.getSafeUrl = getSafeUrl;
        vm.getDate = getDate;
        vm.like = like;
        vm.deletePost = deletePost;
        vm.liked = liked;


        function createPost(post) {
            var link = $filter('parseUrl')(post.text);
            post.link = link ? link[0] : null;
            post.text = $filter('replaceUrl')(post.text);

            PostService.createPost(id, post)
                .then(function (post) {
                    if (post) {
                        PostService.findPostById(id, post._id)
                            .then(function (post) {
                                vm.posts.push(post);
                                vm.post = null;

                            }, function () {
                                init();
                            });
                    }
                }, function (err) {
                    vm.msg = {type: 'error', text: 'Error creating post,try again'};
                });
        }

        function like(post) {
            var postId = post._id;
            var value = !vm.liked(post);
            PostService.likePost(id, postId, value)
                .then(function (post) {
                    var i = -1;
                    for (var p in vm.posts) {
                        if (vm.posts[p]._id === postId) {
                            i = p;
                        }
                    }
                    if (value) {
                        vm.posts[i].likes.push(id);

                    }
                    else {
                        vm.posts[i].likes = _.without(vm.posts[i].likes, id);
                    }
                });
        }

        function liked(post) {
            return (post.likes.indexOf(id) === -1) ? false : true;
        }
        function deletePost(postId) {
            PostService.deletePost(postId, id)
                .then(function () {
                    vm.posts = _.without(vm.posts, _.findWhere(vm.posts, {_id: postId}));
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