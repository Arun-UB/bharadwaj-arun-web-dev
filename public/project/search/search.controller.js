(function () {
    'use strict';
    angular
        .module('Musix')
        .controller('SearchController', SearchController);

    function SearchController($rootScope, $sce, $window, $location, SearchService) {

        var vm = this;
        vm.search = search;
        vm.yResults = {}
        vm.share = share;
        vm.getSafeUrl = getSafeUrl;
        vm.getDate = getDate;
        function search(query, type, event) {
            if (query && event.which === 13 && type === 'YouTube') {
                SearchService.getVideos(query)
                    .then(function (videos) {
                        console.log(videos.data.items);
                        vm.yResults = videos.data.items;

                    }, function (err) {
                        console.log(err);
                    });
            }
            if (query && event.which === 13 && type === 'Users') {
                SearchService.searchUsers(query)
                    .then(function (results) {
                        console.log(results);
                        vm.uResults = results;
                    }, function (err) {
                        console.log(err);
                    });
            }

            if (query && event.which === 13 && type === 'Posts') {
                SearchService.searchPosts(query)
                    .then(function (results) {
                        console.log(results);
                        vm.pResults = results;
                    }, function (err) {
                        console.log(err);
                    });
            }

        }

        function share(video) {
            $rootScope.video = video.id.videoId;
            $location.url('/');

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