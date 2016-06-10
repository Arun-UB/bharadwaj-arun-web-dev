(function () {
    'use strict';
    angular
        .module('WebAppMaker')
        .factory('UserService', UserService);

    function UserService($http){

        var api ={
            createUser: createUser,
            findUserByCredentials : findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        return api;

        function createUser(user) {
            // if(findUserByUsername(user.username)){
            //         return false;
            //     }
            delete user.confirmPassword;
            // user._id = users[users.length-1]['_id']+1;
            // users.push(user);
            // return user._id;
            return $http.post('/api/user/', user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username,password) {
            return $http.get('api/user', {params: {username: username, password: password}})
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(id) {
            return $http.get('/api/user/' + id)
                .then(function (response){
                    return response.data;
                });
        }

        function findUserByUsername(username){
            return $http.get('api/user', {params: {username: username}})
                .then(function (response) {
                    return response.data;
                });
        }
        
        function updateUser(userId,user) {
            return $http.put('/api/user/' + userId, user)
                .then(function (response){
                    return response.data;
                });
        }



        function deleteUser(userId) {
            return $http.delete('/api/user/' + userId)
                .then(function (response) {
                    return response.data;
                });
        }
    }
    
})();