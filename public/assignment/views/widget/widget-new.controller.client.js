(function () {
    'use strict';
    angular
        .module('WebAppMaker')
        .controller('NewWidgetController', NewWidgetController);


    function NewWidgetController($scope, $rootScope, $routeParams, $location, WidgetService, PageService) {
        var vm = this;
        vm.widget = {};
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pid;
        vm.type = $routeParams.type;
        vm.widgetId = null;

        vm.createWidget = createWidget;
        vm.onFileChange = onFileChange;

        function init() {
            if (vm.type === 'IMAGE') {
                vm.widget.url = $rootScope.flickrURL;
            }
        }

        init();
        function createWidget(widget) {
            if (!widget || !widget.name) {
                vm.msg = {type: 'error', text: 'Widget name required'};
            }
            else {
                widget.type = vm.type;
                WidgetService.createWidget(vm.pageId, widget)
                    .then(function (widget) {
                        vm.widgetId = widget._id;
                        return PageService.updateWidgets(vm.pageId, vm.widgetId);
                    }).then(function () {
                    $location.url('/user/' + vm.userId + '/website/' +
                        vm.websiteId + '/page/' + vm.pageId + '/widget');
                }).catch(function (error) {
                    vm.msg = {type: 'error', text: 'Unable to create widget'};
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
