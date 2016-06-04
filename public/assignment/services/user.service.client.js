(function () {
    "use strict";
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);

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
            // user._id = users[users.length-1]["_id"]+1;
            // users.push(user);
            // return user._id;
            return $http.post("/api/user/", user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username,password) {
            return
                for(var u in users){
                if(users[u].username === username && users[u].password === password){
                    return users[u];
                }
            }
            return null;
        }

        function findUserById(id) {
            return $http.get("/api/user/"+id)
                .then(function (response){
                    return response.data;
                });
        }

        function findUserByUsername(username){
            users.forEach(function(u){
                if(u.username === username){
                   return u;
                }
            });
            return null;
        }
        
        function updateUser(userId,user) {
            return $http.put("/api/user/"+userId,user)
                .then(function (response){
                    return response.data;
                });
        }



        function deleteUser(userId) {
            for(var i=0;i<users.length;i++){
                if(users[i]._id === userId){
                    user.splice(i,1);
                    return true;
                }
            }
            return false;
        }
    }
    
})();