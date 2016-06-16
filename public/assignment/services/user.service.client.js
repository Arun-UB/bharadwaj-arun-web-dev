(function () {
    'use strict';
    angular
        .module('WebAppMaker')
        .factory('UserService', UserService);

    function UserService($http, $location) {

        var api ={
            createUser: createUser,
            register: register,
            findUserByCredentials : findUserByCredentials,
            login: login,
            logout: logout,
            loggedIn: loggedIn,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        return api;

        function createUser(user) {
            delete user.confirmPassword;
            return $http.post('/assignment/api/user/', user)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            return $http.post('/assignment/api/login', {username: username, password: password})
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            return $http.post('/assignment/api/logout');

        }

        function loggedIn() {
            return $http.get('/assignment/api/loggedIn');
        }

        function register(user) {
            return $http.post('/assignment/api/register', user)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err.data;
                });
        }
        function findUserByCredentials(username,password) {
            return $http.get('/assignment/api/user', {params: {username: username, password: password}})
                .then(function (response) {
                    return response.data;
                });
        }
        function findUserById(id) {
            return $http.get('/assignment/api/user/' + id)
                .then(function (response){
                    return response.data;
                });
        }

        function findUserByUsername(username){
            return $http.get('/assignment/api/user', {params: {username: username}})
                .then(function (response) {
                    return response.data;
                });
        }
        
        function updateUser(userId,user) {
            return $http.put('/assignment/api/user/' + userId, user)
                .then(function (response){
                    return response.data;
                });
        }



        function deleteUser(userId) {
            return $http.delete('/assignment/api/user/' + userId)
                .then(function (response) {
                    return response.data;
                });
        }
    }
    
})();