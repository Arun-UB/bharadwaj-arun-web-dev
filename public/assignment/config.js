'use strict';
(function(){
    angular
        .module('WebAppMaker')
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/user/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })
            .when('/login', {
                templateUrl: 'views/user/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })
            .when('/profile/', {
                templateUrl: 'views/user/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/user/:userId/website', {
                templateUrl: 'views/website/website-list.view.client.html',
                controller: 'WebsiteListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/new', {
                templateUrl: 'views/website/new-website.view.client.html',
                controller: 'NewWebsiteController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId', {
                templateUrl: 'views/website/edit-website.view.client.html',
                controller: 'EditWebsiteController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page', {
                templateUrl: 'views/page/page-list.view.client.html',
                controller: 'PageListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/new', {
                templateUrl: 'views/page/new-page.view.client.html',
                controller: 'NewPageController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pid', {
                templateUrl: 'views/page/page-edit.view.client.html',
                controller: 'EditPageController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pid/widget', {
                templateUrl: 'views/widget/widget-list.view.client.html',
                controller: 'WidgetListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pid/widget/new', {
                templateUrl: 'views/widget/widget-chooser.view.client.html',
                controller: 'NewWidgetController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pid/widget/new/:type', {
                templateUrl: 'views/widget/widget-new.view.client.html',
                controller: 'NewWidgetController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pid/widget/:wgid', {
                templateUrl: 'views/widget/widget-edit.view.client.html',
                controller: 'EditWidgetController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pid/widget/:wgid/flickr', {
                templateUrl: 'views/widget/widget-flickr-search.view.client.html',
                controller: 'FlickrImageSearchController',
                controllerAs: 'model'
            })
            .otherwise({
                redirectTo: '/login'
            });

        function checkLoggedIn($location, $rootScope, $q, UserService) {
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        $rootScope.currentUser = user;
                        deferred.resolve();
                    } else {
                        $rootScope.currentUser = null;
                        deferred.reject();
                        $location.url('/login');
                    }
                }, function (err) {
                    $location.url('/login');
                });
            return deferred.promise;

        }
    }
})();