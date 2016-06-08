(function () {
    angular
        .module('WebAppMaker')
        .factory('FlickrService', FlickrService);

    var key = '2f8b2a9c657508516e80003ac99ae6ca';
    var secret = '60631662566ecfe9';
    var urlBase = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT';

    function FlickrService($http) {
        var api = {
            searchPhotos: searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace('API_KEY', key)
                .replace('TEXT', searchTerm);
            return $http.get(url);
        }
    }
})();
