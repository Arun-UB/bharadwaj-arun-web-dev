"use strict";
(function(){
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                // controller: "LoginController",
                // controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html"
            })
            .when("/profile/:id", {
                templateUrl: "views/user/profile.view.client.html",
                // controller: "ProfileController",
                // controllerAs: "model"
            });
    }
})();