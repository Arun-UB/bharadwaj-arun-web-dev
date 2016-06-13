(function () {
    'use strict';
    angular
        .module('WebAppMaker')
        .controller('EditWidgetController', EditWidgetController);


    function EditWidgetController($scope, $routeParams, $location, $window, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pid;
        vm.type = $routeParams.type;
        vm.widgetId = $routeParams.wgid;

        function init() {
            WidgetService.findWidgetById(vm.widgetId)
                .then(function (widget) {
                    vm.widget = widget;
                }, function (err) {
                    vm.msg = {type: 'error', text: err.body};
                });
        }

        init();

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.onFileChange = onFileChange;

        function updateWidget(widget) {
            if (!widget || !widget.name) {
                vm.msg = {type: 'error', text: 'Widget name required'};
            }
            else {
                WidgetService.updateWidget(vm.widgetId, widget)
                    .then(function () {
                        $location.url('/user/' + vm.userId + '/website/' +
                            vm.websiteId + '/page/' + vm.pageId + '/widget');
                    }, function (err) {
                        vm.msg = {type: 'error', text: err.body};
                    });

            }
            }

        function deleteWidget() {
            var choice = $window.confirm('Are you sure you want to delete?');
            if (choice) {
                WidgetService.deleteWidget(vm.widgetId)
                    .then(function () {
                        $location.url('/user/' + vm.userId + '/website/' +
                            vm.websiteId + '/page/' + vm.pageId + '/widget');
                    }, function (err) {
                        vm.msg = {type: 'error', text: err.body};
                    });
            }
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

