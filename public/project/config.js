'use strict';
(function () {
    angular
        .module('Musix')
        .config(Config);
    function Config($routeProvider) {

        $routeProvider
        // .when('/', {
        //     templateUrl: 'index.html',
        //     controller: 'LoginController',
        //     controllerAs: 'model'
        // })
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
            .when('/profile/:name', {
                templateUrl: 'user/profile.html',
                // controller: 'ProfileController',
                controllerAs: 'model'
            })
            .when('/profile/:name/edit', {
                templateUrl: 'user/profile.edit.html',
                // controller: 'ProfileController',
                controllerAs: 'model'
            })
            .when('/playlist/', {
                templateUrl: 'player/playlist.view.html',
                controller: 'PlayListController',
                controllerAs: 'model'
            });

    }
})();