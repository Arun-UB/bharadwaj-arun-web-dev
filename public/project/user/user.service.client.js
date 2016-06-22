(function () {
    'use strict';
    angular
        .module('Musix')
        .factory('UserService', UserService);

    function UserService($http) {

        var api = {
            createUser: createUser,
            register: register,
            findUserByCredentials: findUserByCredentials,
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
            return $http.post('/project/api/user/', user)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            return $http.post('/project/api/login', {username: username, password: password})
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            return $http.post('/project/api/logout');

        }

        function loggedIn() {
            return $http.get('/project/api/loggedIn');
        }

        function register(user) {
            return $http.post('/project/api/register', user)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err.data;
                });
        }

        function findUserByCredentials(username, password) {
            return $http.get('/project/api/user', {params: {username: username, password: password}})
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(id) {
            return $http.get('/project/api/user/' + id)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            return $http.get('/project/api/user', {params: {username: username}})
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            return $http.put('/project/api/user/' + userId, user)
                .then(function (response) {
                    return response.data;
                });
        }


        function deleteUser(userId) {
            return $http.delete('/project/api/user/' + userId)
                .then(function (response) {
                    return response.data;
                });
        }
    }

})();