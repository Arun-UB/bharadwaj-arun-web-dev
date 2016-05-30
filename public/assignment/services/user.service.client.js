(function () {
    "use strict";
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);

    function UserService(){
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "tony", password: "tony", firstName: "Tony",   lastName: "Stark" }
        ];

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
            if(findUserByUsername(user.username)){
                    return false;
                }
            delete user.confirmPassword;
            user._id = users[users.length-1]["_id"]+1;
            users.push(user);
            return true;
        }

        function findUserByCredentials(username,password) {
                for(var u in users){
                if(users[u].username === username && users[u].password === password){
                    return users[u];
                }
            }
            return null
        }

        function findUserById(id) {
            for(var u in users){
                if(users[u]._id === id)
                    return users[u];
            }
            return null;
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
            for(var i=0;i<users.length;i++){
                if(users[i]._id === userId){
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    users[i].email = user.email;
                    return true;
                }
            }
            return false;
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