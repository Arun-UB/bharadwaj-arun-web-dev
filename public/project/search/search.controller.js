(function () {
    'use strict';
    angular
        .module('Musix')
        .controller('SearchController', SearchController);

    function SearchController($rootScope, $location, SearchService) {

        var vm = this;
        vm.search = search;
        vm.yResults = {}
        vm.share = share;
        function search(query, type, event) {
            if (query && event.which === 13 && type === 'Youtube') {
                SearchService.getVideos(query)
                    .then(function (videos) {
                        console.log(videos.data.items);
                        vm.yResults = videos.data.items;

                    }, function (err) {
                        console.log(err);
                    });
            }
            if (query && event.which === 13 && type === 'User') {
                SearchService.searchUsers(query)
                    .then(function (results) {
                        console.log(results);
                        vm.uResults = results;
                    }, function (err) {
                        console.log(err);
                    });
            }

        }

        function share(video) {
            $rootScope.video = video.id.videoId;
            $location.url('/');

        }
    }
})();