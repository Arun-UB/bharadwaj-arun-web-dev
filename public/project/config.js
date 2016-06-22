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
            .when('/register', {
                templateUrl: 'user/register.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })
            .when('/profile/', {
                templateUrl: 'user/profile.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/profile/edit', {
                templateUrl: 'user/profile.edit.html',
                controller: 'EditProfileController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/playlist/', {
                templateUrl: 'player/playlist.view.html',
                controller: 'PlayListController',
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
    }
})();