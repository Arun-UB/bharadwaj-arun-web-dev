'use strict';
(function () {
    angular
        .module('Musix')
        .config(Config);
    function Config($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'user/home.html',
                controller: 'HomeController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLoggedIn
                }

            })
            .when('/login', {
                templateUrl: 'user/login.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })
            .when('/admin', {
                templateUrl: 'user/admin.view.html',
                controller: 'AdminController',
                controllerAs: 'model',
                resolve: {
                    admin: checkAdmin
                }
            })
            .when('/register', {
                templateUrl: 'user/register.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })
            .when('/profile/:id', {
                templateUrl: 'user/profile.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/profile/:id/followers', {
                templateUrl: 'user/user.followers.html',
                controller: 'FollowController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/profile/:id/following', {
                templateUrl: 'user/user.following.html',
                controller: 'FollowingController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/profile/:id/edit', {
                templateUrl: 'user/profile.edit.html',
                controller: 'EditProfileController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/search/', {
                templateUrl: 'search/search.view.html',
                controller: 'SearchController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLoggedIn
                }
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

        function checkAdmin($location, $rootScope, $q, UserService) {
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(function (response) {
                    var user = response.data;
                    if (user && user.admin) {
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