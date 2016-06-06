(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($rootScope, $location, $routeParams, FlickrService, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        var wType = "IMAGE";
        $rootScope.flickrURL = null;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }


        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            if (vm.wgid === "-1") {
                $rootScope.flickrURL = url;
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/new/" + wType);
            }
            else {
                WidgetService.findWidgetById(vm.wgid)
                    .then(function (widget) {
                        widget.url = url;
                        WidgetService.updateWidget(vm.wgid, widget)
                            .then(function () {
                                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                            }, function (err) {
                                vm.msg = {type: "error", text: err.body};
                            });
                    }, function (err) {
                        vm.msg = {type: "error", text: err.body};
                    });
            }
        }
    }
})();