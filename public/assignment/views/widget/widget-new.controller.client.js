(function () {
    'use strict';
    angular
        .module('WebAppMaker')
        .controller('NewWidgetController', NewWidgetController);


    function NewWidgetController($scope, $rootScope, $routeParams, $location, WidgetService) {
        var vm = this;
        vm.widget = {};
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pid;
        vm.wType = $routeParams.wType;
        vm.widgetId = null;

        vm.createWidget = createWidget;
        vm.onFileChange = onFileChange;

        function init() {
            if (vm.wType === 'IMAGE') {
                vm.widget.url = $rootScope.flickrURL;
            }
        }

        init();
        function createWidget(widget) {
            widget.widgetType = vm.wType;
            WidgetService.createWidget(vm.pageId, widget)
                .then(function () {
                    $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget');
                }, function () {
                    vm.msg = {type: 'error', text: 'Unable to create widget'};
                });
        }

        function onFileChange() {
            var file = event.target.files[0];
            file.toJSON = function () {
                return {
                    'lastModified': file.lastModified,
                    'lastModifiedDate': file.lastModifiedDate,
                    'name': file.name,
                    'size': file.size,
                    'type': file.type,
                    'content': file.content
                };
            };
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.$apply(function () {
                    file.content = e.target.result;
                    WidgetService.uploadImage(JSON.stringify(file))
                        .then(function (url) {
                            vm.widget.url = url;
                        });
                });
            };
            reader.readAsDataURL(file);

        }
    }
})();
